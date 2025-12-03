// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MintOfTheDay
 * @author Base Top Builders Challenge
 * @notice Daily NFT minting with streak tracking and social features
 * @dev Optimized for gas efficiency and daily user retention
 */
contract MintOfTheDay is ERC721, Ownable, Pausable, ReentrancyGuard {

    // ============ Errors ============

    error AlreadyMintedToday();
    error InvalidMintPrice();
    error StreakCannotBeRestored();
    error NoBrokenStreak();
    error WithdrawalFailed();

    // ============ Events ============

    event DailyMint(
        address indexed minter,
        uint256 indexed tokenId,
        uint256 dayNumber,
        uint16 currentStreak,
        uint16 longestStreak
    );

    event StreakRestored(
        address indexed user,
        uint16 newStreak
    );

    event ThemeUpdated(
        uint256 indexed dayNumber,
        string themeURI
    );

    // ============ Storage ============

    struct MinterData {
        uint128 lastMintDay;      // Day number of last mint
        uint16 currentStreak;     // Current consecutive days
        uint16 longestStreak;     // Best streak ever
        uint16 totalMints;        // Total NFTs minted
        uint16 lastBrokenStreak;  // Streak value before it broke
        uint128 streakBrokenDay;  // When streak was broken
    }

    // User address => Minter data
    mapping(address => MinterData) public minters;

    // Token ID => Day number
    mapping(uint256 => uint256) public tokenDayNumber;

    // Day number => Theme IPFS URI
    mapping(uint256 => string) public dailyThemes;

    // Token counter
    uint256 private _nextTokenId;

    // Mint price (can be 0 for free mints)
    uint256 public mintPrice;

    // Streak restore price
    uint256 public restorePrice;

    // Base URI for metadata
    string private _baseTokenURI;

    // Contract deployment day (for calculating day numbers)
    uint256 public immutable deploymentDay;

    // ============ Constructor ============

    constructor(
        string memory name,
        string memory symbol,
        uint256 _mintPrice,
        uint256 _restorePrice,
        string memory baseURI
    ) ERC721(name, symbol) Ownable(msg.sender) {
        mintPrice = _mintPrice;
        restorePrice = _restorePrice;
        _baseTokenURI = baseURI;
        deploymentDay = block.timestamp / 1 days;
    }

    // ============ Core Functions ============

    /**
     * @notice Mint today's NFT
     * @dev Can only mint once per day. Automatically tracks streaks.
     */
    function mintDaily() external payable nonReentrant whenNotPaused {
        if (msg.value != mintPrice) revert InvalidMintPrice();

        uint256 currentDay = getCurrentDay();
        MinterData storage minter = minters[msg.sender];

        // Check if already minted today (skip check if user has never minted)
        if (minter.totalMints > 0 && minter.lastMintDay == currentDay) revert AlreadyMintedToday();

        // Calculate streak (check currentDay > 0 to avoid underflow)
        bool isConsecutive = (currentDay > 0 && minter.lastMintDay == currentDay - 1);

        if (isConsecutive) {
            // Continue streak
            minter.currentStreak += 1;
        } else if (minter.lastMintDay > 0) {
            // Streak broken - save it for restore option only if within restore window
            if (minter.streakBrokenDay > 0 && currentDay > minter.streakBrokenDay + 2) {
                // Previous broken streak expired, clear it
                minter.lastBrokenStreak = 0;
                minter.streakBrokenDay = 0;
            }
            // Save current streak as broken
            minter.lastBrokenStreak = minter.currentStreak;
            minter.streakBrokenDay = uint128(currentDay);
            minter.currentStreak = 1;
        } else {
            // First mint ever
            minter.currentStreak = 1;
        }

        // Update longest streak if needed
        if (minter.currentStreak > minter.longestStreak) {
            minter.longestStreak = minter.currentStreak;
        }

        // Update minter data
        minter.lastMintDay = uint128(currentDay);
        minter.totalMints += 1;

        // Mint NFT
        uint256 tokenId = _nextTokenId++;
        tokenDayNumber[tokenId] = currentDay;
        _safeMint(msg.sender, tokenId);

        emit DailyMint(
            msg.sender,
            tokenId,
            currentDay,
            minter.currentStreak,
            minter.longestStreak
        );
    }

    /**
     * @notice Restore a broken streak (one-time rescue per break)
     * @dev Can only restore if streak was broken in the last 48 hours
     */
    function restoreStreak() external payable nonReentrant whenNotPaused {
        if (msg.value != restorePrice) revert InvalidMintPrice();

        MinterData storage minter = minters[msg.sender];
        uint256 currentDay = getCurrentDay();

        // Check if there's a broken streak to restore
        if (minter.lastBrokenStreak == 0) revert NoBrokenStreak();

        // Check if within 48 hours (2 days)
        if (currentDay > minter.streakBrokenDay + 2) revert StreakCannotBeRestored();

        // Restore the streak
        minter.currentStreak = minter.lastBrokenStreak;

        // Clear the broken streak (can only use once)
        minter.lastBrokenStreak = 0;
        minter.streakBrokenDay = 0;

        emit StreakRestored(msg.sender, minter.currentStreak);
    }

    // ============ View Functions ============

    /**
     * @notice Get current day number since deployment
     */
    function getCurrentDay() public view returns (uint256) {
        return (block.timestamp / 1 days) - deploymentDay;
    }

    /**
     * @notice Check if user can mint today
     */
    function canMintToday(address user) external view returns (bool) {
        return minters[user].lastMintDay != getCurrentDay();
    }

    /**
     * @notice Get user's complete stats
     */
    function getUserStats(address user) external view returns (
        uint256 lastMintDay,
        uint16 currentStreak,
        uint16 longestStreak,
        uint16 totalMints,
        bool canMint,
        bool canRestore
    ) {
        MinterData memory minter = minters[user];
        uint256 currentDay = getCurrentDay();

        // canMint is true if:
        // 1. User has never minted (totalMints == 0), OR
        // 2. User has minted before but not today (lastMintDay != currentDay)
        bool userCanMint = (minter.totalMints == 0) || (minter.lastMintDay != currentDay);

        return (
            minter.lastMintDay,
            minter.currentStreak,
            minter.longestStreak,
            minter.totalMints,
            userCanMint,
            minter.lastBrokenStreak > 0 && currentDay <= minter.streakBrokenDay + 2
        );
    }

    /**
     * @notice Get token metadata URI
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        uint256 dayNumber = tokenDayNumber[tokenId];
        string memory dayTheme = dailyThemes[dayNumber];

        // If no custom theme, use base URI with day number
        if (bytes(dayTheme).length > 0) {
            return dayTheme;
        }

        return string(abi.encodePacked(_baseTokenURI, "/", _toString(dayNumber)));
    }

    // ============ Admin Functions ============

    /**
     * @notice Set daily theme URI for a specific day
     */
    function setDailyTheme(uint256 dayNumber, string memory themeURI) external onlyOwner {
        dailyThemes[dayNumber] = themeURI;
        emit ThemeUpdated(dayNumber, themeURI);
    }

    /**
     * @notice Set multiple daily themes at once (gas optimization)
     */
    function setDailyThemesBatch(
        uint256[] calldata dayNumbers,
        string[] calldata themeURIs
    ) external onlyOwner {
        require(dayNumbers.length == themeURIs.length, "Length mismatch");

        for (uint256 i = 0; i < dayNumbers.length; i++) {
            dailyThemes[dayNumbers[i]] = themeURIs[i];
            emit ThemeUpdated(dayNumbers[i], themeURIs[i]);
        }
    }

    /**
     * @notice Update mint price
     */
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    /**
     * @notice Update restore price
     */
    function setRestorePrice(uint256 newPrice) external onlyOwner {
        restorePrice = newPrice;
    }

    /**
     * @notice Update base URI
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    /**
     * @notice Pause minting (emergency only)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause minting
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Withdraw contract balance
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        if (!success) revert WithdrawalFailed();
    }

    // ============ Internal Helpers ============

    /**
     * @dev Convert uint256 to string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
