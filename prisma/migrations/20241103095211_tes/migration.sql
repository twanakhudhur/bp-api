-- CreateTable
CREATE TABLE `Country` (
    `id` VARCHAR(191) NOT NULL,
    `country` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Country_country_key`(`country`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RollType` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `RollType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RollQuality` (
    `id` VARCHAR(191) NOT NULL,
    `quality` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `RollQuality_quality_key`(`quality`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `role` VARCHAR(15) NOT NULL,
    `isFrozen` BOOLEAN NOT NULL DEFAULT false,
    `expiration` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    INDEX `User_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roll` (
    `id` VARCHAR(191) NOT NULL,
    `rollCode` VARCHAR(50) NOT NULL,
    `img` VARCHAR(30) NULL,
    `netWeight` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `grossWeight` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `width` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `theoryLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `actualLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `thickness` DECIMAL(7, 2) NOT NULL,
    `comment` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `typeId` VARCHAR(191) NULL,
    `madeInId` VARCHAR(191) NULL,
    `qualityId` VARCHAR(191) NULL,
    `creatorId` VARCHAR(191) NULL,

    UNIQUE INDEX `Roll_rollCode_key`(`rollCode`),
    UNIQUE INDEX `Roll_img_key`(`img`),
    INDEX `Roll_createdAt_idx`(`createdAt`),
    INDEX `Roll_creatorId_idx`(`creatorId`),
    INDEX `Roll_typeId_idx`(`typeId`),
    INDEX `Roll_qualityId_idx`(`qualityId`),
    INDEX `Roll_madeInId_idx`(`madeInId`),
    INDEX `Roll_thickness_idx`(`thickness`),
    INDEX `Roll_createdAt_creatorId_typeId_qualityId_madeInId_thickness_idx`(`createdAt`, `creatorId`, `typeId`, `qualityId`, `madeInId`, `thickness`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SlitRoll` (
    `id` VARCHAR(191) NOT NULL,
    `actualWidth` DECIMAL(7, 2) NOT NULL,
    `daySeries` INTEGER NOT NULL,
    `dividedInto` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rollCode` VARCHAR(50) NOT NULL,
    `img` VARCHAR(30) NULL,
    `rollComment` VARCHAR(255) NULL,
    `rollCreatedAt` DATETIME(3) NOT NULL,
    `netWeight` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `grossWeight` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `width` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `theoryLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `actualLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `thickness` DECIMAL(7, 2) NOT NULL,
    `typeId` VARCHAR(191) NULL,
    `madeInId` VARCHAR(191) NULL,
    `qualityId` VARCHAR(191) NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `rollCreatorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SlitRoll_rollCode_key`(`rollCode`),
    UNIQUE INDEX `SlitRoll_img_key`(`img`),
    INDEX `SlitRoll_createdAt_idx`(`createdAt`),
    INDEX `SlitRoll_creatorId_idx`(`creatorId`),
    INDEX `SlitRoll_typeId_idx`(`typeId`),
    INDEX `SlitRoll_qualityId_idx`(`qualityId`),
    INDEX `SlitRoll_madeInId_idx`(`madeInId`),
    INDEX `SlitRoll_thickness_idx`(`thickness`),
    INDEX `SlitRoll_createdAt_creatorId_typeId_qualityId_madeInId_thick_idx`(`createdAt`, `creatorId`, `typeId`, `qualityId`, `madeInId`, `thickness`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Piece` (
    `id` VARCHAR(191) NOT NULL,
    `autoCode` VARCHAR(50) NOT NULL,
    `pieceSeries` INTEGER NOT NULL DEFAULT 0,
    `weight` DECIMAL(7, 2) NOT NULL,
    `width` DECIMAL(7, 2) NOT NULL,
    `thickness` DECIMAL(7, 2) NOT NULL,
    `comment` VARCHAR(255) NULL,
    `theoryLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `actualLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `thinned` BOOLEAN NOT NULL DEFAULT false,
    `thinningThickness` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `thinningLength` DECIMAL(7, 2) NOT NULL DEFAULT 0,
    `typeId` VARCHAR(191) NULL,
    `madeInId` VARCHAR(191) NULL,
    `qualityId` VARCHAR(191) NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `slitRollId` VARCHAR(191) NULL,

    UNIQUE INDEX `Piece_autoCode_key`(`autoCode`),
    INDEX `Piece_createdAt_idx`(`createdAt`),
    INDEX `Piece_creatorId_idx`(`creatorId`),
    INDEX `Piece_slitRollId_idx`(`slitRollId`),
    INDEX `Piece_typeId_idx`(`typeId`),
    INDEX `Piece_qualityId_idx`(`qualityId`),
    INDEX `Piece_madeInId_idx`(`madeInId`),
    INDEX `Piece_thickness_idx`(`thickness`),
    INDEX `Piece_width_idx`(`width`),
    INDEX `Piece_createdAt_typeId_qualityId_madeInId_thickness_width_idx`(`createdAt`, `typeId`, `qualityId`, `madeInId`, `thickness`, `width`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Waste` (
    `id` VARCHAR(191) NOT NULL,
    `autoCode` VARCHAR(50) NOT NULL,
    `pieceSeries` INTEGER NOT NULL DEFAULT 0,
    `weight` DECIMAL(7, 2) NOT NULL,
    `width` DECIMAL(7, 2) NOT NULL,
    `thickness` DECIMAL(7, 2) NOT NULL,
    `comment` VARCHAR(255) NULL,
    `theoryLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `actualLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `typeId` VARCHAR(191) NULL,
    `madeInId` VARCHAR(191) NULL,
    `qualityId` VARCHAR(191) NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `slitRollId` VARCHAR(191) NULL,
    `soldWasteId` VARCHAR(191) NULL,

    UNIQUE INDEX `Waste_autoCode_key`(`autoCode`),
    INDEX `Waste_createdAt_idx`(`createdAt`),
    INDEX `Waste_creatorId_idx`(`creatorId`),
    INDEX `Waste_slitRollId_idx`(`slitRollId`),
    INDEX `Waste_typeId_idx`(`typeId`),
    INDEX `Waste_qualityId_idx`(`qualityId`),
    INDEX `Waste_madeInId_idx`(`madeInId`),
    INDEX `Waste_thickness_idx`(`thickness`),
    INDEX `Waste_width_idx`(`width`),
    INDEX `Waste_soldWasteId_idx`(`soldWasteId`),
    INDEX `Waste_createdAt_thickness_width_soldWasteId_idx`(`createdAt`, `thickness`, `width`, `soldWasteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SoldWaste` (
    `id` VARCHAR(191) NOT NULL,
    `totalWeight` DECIMAL(10, 2) NOT NULL,
    `soldTo` VARCHAR(50) NOT NULL,
    `comment` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `creatorId` VARCHAR(191) NOT NULL,

    INDEX `SoldWaste_creatorId_idx`(`creatorId`),
    INDEX `SoldWaste_createdAt_idx`(`createdAt`),
    INDEX `SoldWaste_createdAt_creatorId_idx`(`createdAt`, `creatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Line` (
    `id` VARCHAR(191) NOT NULL,
    `line` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `Line_line_key`(`line`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tambur` (
    `id` VARCHAR(191) NOT NULL,
    `actualWeight` DECIMAL(7, 2) NULL,
    `img` VARCHAR(30) NULL,
    `comment` VARCHAR(255) NULL,
    `lineId` VARCHAR(191) NOT NULL,
    `autoCode` VARCHAR(50) NOT NULL,
    `pieceSeries` INTEGER NOT NULL DEFAULT 0,
    `weight` DECIMAL(7, 2) NOT NULL,
    `width` DECIMAL(7, 2) NOT NULL,
    `thickness` DECIMAL(7, 2) NOT NULL,
    `pieceComment` VARCHAR(255) NULL,
    `theoryLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `actualLength` DECIMAL(7, 2) NULL DEFAULT 0,
    `pieceCreatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `typeId` VARCHAR(191) NULL,
    `madeInId` VARCHAR(191) NULL,
    `qualityId` VARCHAR(191) NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `pieceCreatorId` VARCHAR(191) NOT NULL,
    `slitRollId` VARCHAR(191) NULL,

    UNIQUE INDEX `Tambur_img_key`(`img`),
    UNIQUE INDEX `Tambur_autoCode_key`(`autoCode`),
    INDEX `Tambur_creatorId_idx`(`creatorId`),
    INDEX `Tambur_createdAt_idx`(`createdAt`),
    INDEX `Tambur_typeId_idx`(`typeId`),
    INDEX `Tambur_qualityId_idx`(`qualityId`),
    INDEX `Tambur_madeInId_idx`(`madeInId`),
    INDEX `Tambur_thickness_idx`(`thickness`),
    INDEX `Tambur_lineId_idx`(`lineId`),
    INDEX `Tambur_slitRollId_idx`(`slitRollId`),
    INDEX `Tambur_createdAt_thickness_lineId_width_idx`(`createdAt`, `thickness`, `lineId`, `width`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpareList` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,

    UNIQUE INDEX `SpareList_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Spare` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `spareListId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Spare_spareListId_key`(`spareListId`),
    INDEX `Spare_createdAt_idx`(`createdAt`),
    INDEX `Spare_spareListId_idx`(`spareListId`),
    INDEX `Spare_createdAt_spareListId_idx`(`createdAt`, `spareListId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsedSpare` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(255) NULL,
    `spareId` VARCHAR(191) NOT NULL,
    `gaveBy` VARCHAR(191) NOT NULL,
    `usedBy` VARCHAR(191) NOT NULL,

    INDEX `UsedSpare_createdAt_idx`(`createdAt`),
    INDEX `UsedSpare_spareId_idx`(`spareId`),
    INDEX `UsedSpare_gaveBy_idx`(`gaveBy`),
    INDEX `UsedSpare_usedBy_idx`(`usedBy`),
    INDEX `UsedSpare_createdAt_spareId_gaveBy_usedBy_idx`(`createdAt`, `spareId`, `gaveBy`, `usedBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` VARCHAR(191) NOT NULL,
    `activity` VARCHAR(30) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Activity_createdAt_idx`(`createdAt`),
    INDEX `Activity_userId_idx`(`userId`),
    INDEX `Activity_createdAt_userId_idx`(`createdAt`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Roll` ADD CONSTRAINT `Roll_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RollType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roll` ADD CONSTRAINT `Roll_madeInId_fkey` FOREIGN KEY (`madeInId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roll` ADD CONSTRAINT `Roll_qualityId_fkey` FOREIGN KEY (`qualityId`) REFERENCES `RollQuality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roll` ADD CONSTRAINT `Roll_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SlitRoll` ADD CONSTRAINT `SlitRoll_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RollType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SlitRoll` ADD CONSTRAINT `SlitRoll_madeInId_fkey` FOREIGN KEY (`madeInId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SlitRoll` ADD CONSTRAINT `SlitRoll_qualityId_fkey` FOREIGN KEY (`qualityId`) REFERENCES `RollQuality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SlitRoll` ADD CONSTRAINT `SlitRoll_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SlitRoll` ADD CONSTRAINT `SlitRoll_rollCreatorId_fkey` FOREIGN KEY (`rollCreatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piece` ADD CONSTRAINT `Piece_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RollType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piece` ADD CONSTRAINT `Piece_madeInId_fkey` FOREIGN KEY (`madeInId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piece` ADD CONSTRAINT `Piece_qualityId_fkey` FOREIGN KEY (`qualityId`) REFERENCES `RollQuality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piece` ADD CONSTRAINT `Piece_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piece` ADD CONSTRAINT `Piece_slitRollId_fkey` FOREIGN KEY (`slitRollId`) REFERENCES `SlitRoll`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Waste` ADD CONSTRAINT `Waste_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RollType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Waste` ADD CONSTRAINT `Waste_madeInId_fkey` FOREIGN KEY (`madeInId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Waste` ADD CONSTRAINT `Waste_qualityId_fkey` FOREIGN KEY (`qualityId`) REFERENCES `RollQuality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Waste` ADD CONSTRAINT `Waste_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Waste` ADD CONSTRAINT `Waste_slitRollId_fkey` FOREIGN KEY (`slitRollId`) REFERENCES `SlitRoll`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Waste` ADD CONSTRAINT `Waste_soldWasteId_fkey` FOREIGN KEY (`soldWasteId`) REFERENCES `SoldWaste`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SoldWaste` ADD CONSTRAINT `SoldWaste_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tambur` ADD CONSTRAINT `Tambur_lineId_fkey` FOREIGN KEY (`lineId`) REFERENCES `Line`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tambur` ADD CONSTRAINT `Tambur_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `RollType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tambur` ADD CONSTRAINT `Tambur_madeInId_fkey` FOREIGN KEY (`madeInId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tambur` ADD CONSTRAINT `Tambur_qualityId_fkey` FOREIGN KEY (`qualityId`) REFERENCES `RollQuality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tambur` ADD CONSTRAINT `Tambur_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tambur` ADD CONSTRAINT `Tambur_pieceCreatorId_fkey` FOREIGN KEY (`pieceCreatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tambur` ADD CONSTRAINT `Tambur_slitRollId_fkey` FOREIGN KEY (`slitRollId`) REFERENCES `SlitRoll`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Spare` ADD CONSTRAINT `Spare_spareListId_fkey` FOREIGN KEY (`spareListId`) REFERENCES `SpareList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsedSpare` ADD CONSTRAINT `UsedSpare_spareId_fkey` FOREIGN KEY (`spareId`) REFERENCES `Spare`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsedSpare` ADD CONSTRAINT `UsedSpare_gaveBy_fkey` FOREIGN KEY (`gaveBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
