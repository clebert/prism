// This file comes from Blizzard API documentation.
// Run npm run sync:wow-api to replace it.

declare namespace Constants {
  const AuctionConstants: {
    readonly "DEFAULT_AUCTION_PRICE_MULTIPLIER": 1.5;
  };
  const CAAConstants: {
    readonly "CAADebuffSelfAlertDefault": 0;
    readonly "CAAEnabledDefault": false;
    readonly "CAAFrequencyDefault": 0;
    readonly "CAAFrequencyMax": 10;
    readonly "CAAFrequencyMin": -10;
    readonly "CAAInterruptCastDefault": 0;
    readonly "CAAInterruptCastSuccessDefault": 0;
    readonly "CAAMinCastTimeDefault": 1.5;
    readonly "CAAMinCastTimeMax": 5;
    readonly "CAAMinCastTimeMin": 0;
    readonly "CAAMinCastTimeStep": 0.5;
    readonly "CAAPartyHealthPercentDefault": 0;
    readonly "CAAPlayerCastFormatDefault": 4;
    readonly "CAAPlayerCastModeDefault": 0;
    readonly "CAAPlayerHealthFormatDefault": 1;
    readonly "CAAPlayerHealthPercentDefault": 0;
    readonly "CAAPlayerResourceFormatDefault": 1;
    readonly "CAAPlayerResourcePercentDefault": 0;
    readonly "CAAPulsePlayerHealthPercentDefault": 0;
    readonly "CAASamePercentThrottleTime": 10;
    readonly "CAASampleTextThrottleTime": 1;
    readonly "CAASayCombatEndDefault": true;
    readonly "CAASayCombatStartDefault": true;
    readonly "CAASayIfTargetedDefault": 1;
    readonly "CAASayYourDebuffsDefault": true;
    readonly "CAASayYourDebuffsFormatDefault": 0;
    readonly "CAASayYourDebuffsMinDurationDefault": 1.5;
    readonly "CAASayYourDebuffsMinDurationMax": 5;
    readonly "CAASayYourDebuffsMinDurationMin": 0;
    readonly "CAASayYourDebuffsMinDurationStep": 0.5;
    readonly "CAATargetCastFormatDefault": 0;
    readonly "CAATargetCastModeDefault": 0;
    readonly "CAATargetDeathBehaviorDefault": 0;
    readonly "CAATargetHealthFormatDefault": 3;
    readonly "CAATargetHealthPercentDefault": 2;
    readonly "CAATargetNameDefault": true;
    readonly "CAAThrottleDefault": 0;
    readonly "CAAThrottleMax": 5;
    readonly "CAAThrottleMin": 0;
    readonly "CAAThrottleStep": 0.5;
    readonly "CAAVoiceDefault": 0;
  };
  const CalendarGetEventTypeConstants: {
    readonly "DEFAULT_CALENDAR_GET_EVENT_TYPE": WowApi.CalendarGetEventType;
  };
  const Callings: {
    readonly "MaxCallings": 3;
  };
  const CatalogShopVirtualCurrencyConstants: {
    readonly "HEARTHSTEEL_VC_CURRENCY_CODE": "XVV";
    readonly "TRADERS_TENDER_VC_CURRENCY_CODE": "XWP";
  };
  const CharCustomizationConstants: {
    readonly "CHAR_CUSTOMIZE_CUSTOM_DISPLAY_OPTION_FIRST": "CustomOptionTattoo";
    readonly "CHAR_CUSTOMIZE_CUSTOM_DISPLAY_OPTION_LAST": "CustomOptionTattooColor";
    readonly "NAME_RESERVATION_DAYS": 30;
    readonly "NUM_CUSTOM_DISPLAY": number;
  };
  const ChatFrameConstants: {
    readonly "MaxCharacterNameBytes": number;
    readonly "MaxChatChannels": 20;
    readonly "MaxChatWindows": 10;
  };
  const CombatLogMessageLimits: {
    readonly "CombatLogDefaultMessageLimit": 300;
    readonly "CombatLogMaximumMessageLimit": 1000;
  };
  const CombatLogObjectMasks: {
    readonly "COMBATLOG_OBJECT_AFFILIATION_MASK": 15;
    readonly "COMBATLOG_OBJECT_CONTROL_MASK": 768;
    readonly "COMBATLOG_OBJECT_REACTION_MASK": 240;
    readonly "COMBATLOG_OBJECT_SPECIAL_MASK": 4294901760;
    readonly "COMBATLOG_OBJECT_TYPE_MASK": 64512;
  };
  const CombatLogObjectTargetMasks: {
    readonly "COMBATLOG_OBJECT_RAID_MASK": 4294967295;
    readonly "COMBATLOG_OBJECT_RAID_TARGET_MASK": 255;
  };
  const ContentTrackingConsts: {
    readonly "MaxTrackedAchievements": 10;
    readonly "MaxTrackedCollectableSources": 15;
  };
  const CooldownFrameDefaults: {
    readonly "COOLDOWN_DEFAULT_BLING_DURATION_MS": 1000;
    readonly "COOLDOWN_DEFAULT_COUNTDOWN_ABBREV_THRESHOLD_MS": 120000;
    readonly "COOLDOWN_DEFAULT_COUNTDOWN_MILLISECOND_THRESHOLD_MS": 0;
    readonly "COOLDOWN_DEFAULT_COUNTDOWN_MINIMUM_DURATION_MS": 2000;
    readonly "COOLDOWN_DEFAULT_USE_AURA_DISPLAY_TIME": false;
  };
  const CooldownViewerUIConstants: {
    readonly "COOLDOWN_VIEWER_CATEGORY_SET_SIZE": 16;
    readonly "COOLDOWN_VIEWER_COMBAT_POTION_ICON_FID": 134737;
    readonly "COOLDOWN_VIEWER_HEALTH_POTION_ICON_FID": 134834;
    readonly "COOLDOWN_VIEWER_HEALTHSTONE_ICON_FID": 538745;
    readonly "COOLDOWN_VIEWER_LINKED_SPELLS_SIZE": 4;
    readonly "COOLDOWN_VIEWER_SPEC_AGNOSTIC_PARENT_ID": 0;
  };
  const CraftingOrderConsts: {
    readonly "MAX_CRAFTING_ORDER_FAVORITE_RECIPES": 100;
    readonly "NPC_CRAFTING_ORDER_NUM_SUPPORTED_REWARDS": 2;
  };
  const CurrencyConsts: {
    readonly "ACCOUNT_WIDE_HONOR_CURRENCY_ID": 1585;
    readonly "ACCOUNT_WIDE_HONOR_LEVEL_CURRENCY_ID": 1586;
    readonly "ARTIFACT_KNOWLEDGE_CURRENCY_ID": 1171;
    readonly "CLASSIC_HONOR_CURRENCY_ID": 1901;
    readonly "CONQUEST_ARENA_AND_BG_META_CURRENCY_ID": 483;
    readonly "CONQUEST_ARENA_META_CURRENCY_ID": 483;
    readonly "CONQUEST_ASHRAN_META_CURRENCY_ID": 692;
    readonly "CONQUEST_BG_META_CURRENCY_ID": 484;
    readonly "CONQUEST_CURRENCY_ID": 1602;
    readonly "CONQUEST_POINTS_CURRENCY_ID": 390;
    readonly "CONQUEST_RATED_BG_META_CURRENCY_ID": 484;
    readonly "CURRENCY_ID_PERKS_PROGRAM_DISPLAY_INFO": 2032;
    readonly "CURRENCY_ID_RENOWN": 1822;
    readonly "CURRENCY_ID_RENOWN_KYRIAN": 1829;
    readonly "CURRENCY_ID_RENOWN_LEGACY": 3485;
    readonly "CURRENCY_ID_RENOWN_NECROLORD": 1832;
    readonly "CURRENCY_ID_RENOWN_NIGHT_FAE": 1831;
    readonly "CURRENCY_ID_RENOWN_PVP_RANK": 3473;
    readonly "CURRENCY_ID_RENOWN_VENTHYR": 1830;
    readonly "CURRENCY_ID_RESERVOIR_ANIMA": 1813;
    readonly "CURRENCY_ID_WILLING_SOUL": 1810;
    readonly "CURRENCY_WALLET_TYPE_WOWMONEY": 0;
    readonly "DRAGON_ISLES_SUPPLIES_CURRENCY_ID": 2003;
    readonly "ECHOES_OF_NYALOTHA_CURRENCY_ID": 1803;
    readonly "HONOR_CURRENCY_ID": 1792;
    readonly "IMMEDIATE_CURRENCY_WALLET_ITEM_ID": 276637;
    readonly "MAX_CURRENCY_QUANTITY": 100000000;
    readonly "PLAYER_CURRENCY_CLIENT_FLAGS": WowApi.PlayerCurrencyFlagsDbFlags;
    readonly "PVP_CURRENCY_CONQUEST_ALLIANCE_INV_ICON": 463448;
    readonly "PVP_CURRENCY_CONQUEST_HORDE_INV_ICON": 463449;
    readonly "PVP_CURRENCY_HONOR_ALLIANCE_INV_ICON": 463450;
    readonly "PVP_CURRENCY_HONOR_HORDE_INV_ICON": 463451;
    readonly "QUESTIONMARK_INV_ICON": 134400;
    readonly "WAR_RESOURCES_CURRENCY_ID": 1560;
  };
  const DelvesConsts: {
    readonly "DELVES_COMPANION_BRANN_CREATURE_ID": 210759;
    readonly "DELVES_COMPANION_INFO_SELECTION_CHARACTER_DATA_ELEMENT_ID": 13;
    readonly "DELVES_COMPANION_TOOLTIP_WIDGET_SET_ID": 1331;
    readonly "DELVES_COMPANION_VALEERA_CREATURE_ID": 248567;
    readonly "DELVES_MIN_PLAYER_LEVEL_CONTENT_TUNING_ID": 2677;
    readonly "DELVES_NORMAL_KEY_CURRENCY_ID": 3028;
  };
  const EditModeConsts: {
    readonly "EditModeDefaultGridSpacing": 100;
    readonly "EditModeMaxGridSpacing": 300;
    readonly "EditModeMaxLayoutsPerType": 5;
    readonly "EditModeMinGridSpacing": 20;
  };
  const EditModeLayoutConsts_Mainline: {
    readonly "EditModeDefaultLayout": WowApi.EditModePresetLayouts;
  };
  const EncodingLimits: {
    readonly "EncodingDecompressSizeLimit": 104857600;
    readonly "EncodingStackSizeLimit": 100;
  };
  const EncounterTimelineEventConstants: {
    readonly "ENCOUNTER_TIMELINE_INVALID_EVENT": 0;
    readonly "ENCOUNTER_TIMELINE_RESERVED_EVENT_COUNT": 40;
  };
  const EncounterTimelineIconMasks: {
    readonly "EncounterTimelineAllIcons": 1023;
    readonly "EncounterTimelineDamageAlertIcons": "DpsRole";
    readonly "EncounterTimelineDeadlyIcons": "DeadlyEffect";
    readonly "EncounterTimelineDispelIcons": 124;
    readonly "EncounterTimelineEnrageIcons": "EnrageEffect";
    readonly "EncounterTimelineHealerAlertIcons": "HealerRole";
    readonly "EncounterTimelineNoIcons": 0;
    readonly "EncounterTimelineOtherIcons": 127;
    readonly "EncounterTimelineRoleIcons": 896;
    readonly "EncounterTimelineTankAlertIcons": "TankRole";
  };
  const EventScheduler: {
    readonly "SCHEDULED_EVENT_FUTURE_LIMIT": 12;
    readonly "SCHEDULED_EVENT_PAST_LIMIT_SECONDS": 3600;
    readonly "SCHEDULED_EVENT_REMINDER_DEAD_SECONDS": 10;
    readonly "SCHEDULED_EVENT_REMINDER_WARNING_SECONDS": 300;
  };
  const GamepadActionBarConstants: {
    readonly "GAMEPAD_ACTION_BAR_PAGE_UNIT_SPECIAL_PAGE_INDEX": 4;
    readonly "NUM_GAMEPAD_STANCE_ACTION_BARS": 5;
    readonly "NUM_GROUPS_PER_GAMEPAD_ACTION_BAR": 2;
    readonly "NUM_PAGEABLE_BARS_IN_GAMEPAD_ACTION_BAR_PAGE_UNIT": 4;
    readonly "NUM_PAGEABLE_SLOTS_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT": number;
    readonly "NUM_PAGEABLE_SLOTS_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT_STANDARD_PAGE": number;
    readonly "NUM_PAGES_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT": 4;
    readonly "NUM_RESERVED_SLOTS_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT": 4;
    readonly "NUM_SLOTS_PER_GAMEPAD_ACTION_BAR": number;
    readonly "NUM_SLOTS_PER_GAMEPAD_ACTION_BAR_GROUP": 4;
    readonly "NUM_STANDARD_PAGES_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT": 3;
  };
  const GroupBuffUIConstants: {
    readonly "GROUP_BUFF_ITEM_LIST_SIZE": 16;
  };
  const HousingCatalogConsts: {
    readonly "HOUSING_CATALOG_ALL_CATEGORY_ID": 18;
    readonly "HOUSING_CATALOG_DECOR_MODELSCENEID_DEFAULT": 1317;
    readonly "HOUSING_CATALOG_FEATURED_CATEGORY_ID": 17;
  };
  const HousingConsts: {
    readonly "BlueprintNameMaxCharacters": 0;
    readonly "BlueprintNameMinCharacters": 0;
    readonly "HOUSING_BLUEPRINTS_MAX_BACKUPS_PER_BNET_ACCOUNT": 10;
    readonly "HOUSING_BLUEPRINTS_MAX_PER_BNET_ACCOUNT": 50;
    readonly "NeighborhoodNameMaxCharacters": 0;
    readonly "NeighborhoodNameMinCharacters": 0;
  };
  const InventoryConstants: {
    readonly "MAX_TRANSACTION_BANK_TABS": 0;
    readonly "NumAccountBankSlots": number;
    readonly "NumBagSlots": number;
    readonly "NumCharacterBankSlots": number;
    readonly "NumReagentBagSlots": number;
  };
  const ITEM_WEAPON_SUBCLASSConstants: {
    readonly "ITEM_WEAPON_SUBCLASS_IS2HWEAPON_MASK": 0;
    readonly "ITEM_WEAPON_SUBCLASS_ISMAINHANDWEAPON_NONRANGED_MASK": 0;
    readonly "ITEM_WEAPON_SUBCLASS_ISRANGEDWEAPON_MASK": 0;
    readonly "ITEM_WEAPON_SUBCLASS_ISTWOHANDEDRANGEDWEAPON_MASK": 0;
    readonly "ITEM_WEAPON_SUBCLASS_MASK": 0;
    readonly "ITEM_WEAPON_SUBCLASS_NONE": -1;
    readonly "ITEM_WEAPON_SUBCLASS_USES2HANDS_MASK": 0;
  };
  const ITEM_WEAPON_SUBCLASSConstants_PostMists: {
    readonly "ITEM_WEAPON_SUBCLASS_ISTITANSGRIPWEAPON_MASK": 0;
  };
  const ItemConsts: {
    readonly "CASTER_WEAPON_DAMAGE_REDUCTION_DIVISOR_WITH_FLAG": 3;
    readonly "CASTER_WEAPON_SPELL_HEALING_DAMAGE_MULT_WITH_FLAG": 1.253;
    readonly "CASTER_WEAPON_SPELL_HEALING_MULT_WITH_FLAG": 3.76;
    readonly "CASTER_WEAPON_SPELL_POWER_MULT_WITH_FLAG": 2;
    readonly "CURRENT_ARTIFACT_POWERS_VERSION": number;
    readonly "CURRENT_ITEM_SAVE_VERSION": number;
    readonly "DEFAULT_ARTIFACT_POWERS_VERSION": 1;
    readonly "DEFAULT_ITEM_SAVE_VERSION": 2;
    readonly "DEFAULT_RETENTION": 7;
    readonly "INVALID_BANK_TAB_SLOT": 255;
    readonly "MAX_LOOT_OBJECT_ITEMS": 31;
    readonly "MAXIMUM_QUEST_ITEM_LOOT_PRIORITY_VALUES": 16;
    readonly "NUM_ITEM_ENCHANTMENT_SOCKETS": 3;
    readonly "NUM_PROFESSION_PROP_POINTS_CATEGORIES": 2;
    readonly "NUM_RAND_PROP_POINTS_CATEGORIES": 5;
  };
  const ItemConsts_Mainline: {
    readonly "HWM_SQUISH_ERA_PLAYER_DATA_ACCOUNT_ELEMENT_ID": 212;
  };
  const LegacyConsts: {
    readonly "LEGACY_POINTS_TRAIT_CURRENCY_ID": 4225;
    readonly "LEGACY_REWARD_TRACK_FACTION_ID": 2802;
    readonly "LEGACY_TREE_ADVENTURE_ID": 1188;
    readonly "LEGACY_TREE_ADVENTURE_TALENTED_NODE_ID": 110298;
    readonly "LEGACY_TREE_PROFESSIONS_ID": 1187;
    readonly "LEGACY_TREE_PROGRESSION_ID": 1189;
  };
  const LevelConstsExposed: {
    readonly "MIN_ACHIEVEMENT_LEVEL": 10;
    readonly "MIN_RES_SICKNESS_LEVEL": 10;
    readonly "MIN_TALENT_LEVEL": 10;
  };
  const LFG_ROLEConstants: {
    readonly "LFG_ROLE_ANY": WowApi.LFGRole;
    readonly "LFG_ROLE_NO_ROLE": -1;
  };
  const LFGConstsExposed: {
    readonly "GROUP_FINDER_MAX_ACTIVITY_CAPACITY": 16;
  };
  const LootConsts_Camelot: {
    readonly "MasterLootQualityThreshold": 4;
  };
  const LossOfControlConsts: {
    readonly "LOSS_OF_CONTROL_ACTIVE_INDEX": 1;
  };
  const MacroConsts: {
    readonly "MAX_ACCOUNT_MACROS": 120;
    readonly "MAX_CHARACTER_MACROS": 30;
  };
  const MajorFactionsConsts: {
    readonly "PLUNDERSTORM_MAJOR_FACTION_ID": 2593;
    readonly "WORLD_STATE_RAPID_RENOWN_CAP_10_0": 20851;
    readonly "WORLD_STATE_RENOWN_CAP_10_0": 19735;
  };
  const MoneyFormattingConstants: {
    readonly "GOLD_REWARD_THRESHOLD_TO_HIDE_COPPER": 10;
  };
  const MountDynamicFlightConsts: {
    readonly "TRAIT_SYSTEM_ID": 1;
    readonly "TREE_ID": 672;
  };
  const PartyCountdownConstants: {
    readonly "MaxCountdownSeconds": 3600;
  };
  const PetBattleConsts: {
    readonly "SUMMON_RANDOM_FAVORITE_BATTLEPET_SPELL_ID": 243819;
  };
  const PetConsts_Camelot: {
    readonly "DEFAULT_PET_PERSONALITY": 1;
    readonly "EXTRA_PET_STABLE_SLOT": number;
    readonly "MAX_NUM_PET_SLOTS": number;
    readonly "MAX_STABLE_SLOTS": 2;
    readonly "MAX_SUMMONABLE_HUNTER_PETS": number;
    readonly "NUM_PET_SLOTS_HUNTER": number;
    readonly "NUM_PET_SLOTS_THAT_NEED_LEARNED_SPELL": 1;
    readonly "PET_XP_LEVEL_MODIFIER": 0.25;
    readonly "STABLED_PETS_FIRST_SLOT_INDEX": number;
  };
  const ProfessionConsts: {
    readonly "CLASSIC_PROFESSION_PARENT_TIER_INDEX": 4;
    readonly "CRAFTING_ORDER_CLAIM_DURATION": 0;
    readonly "CRAFTING_ORDER_CURRENCY_WALLET_ITEM_ID": 262724;
    readonly "CRAFTING_ORDER_ITEM_RETENTION": 30;
    readonly "MAX_CRAFTING_REAGENT_SLOTS": 12;
    readonly "NUM_PRIMARY_PROFESSIONS": 2;
    readonly "PUBLIC_CRAFTING_ORDER_STALE_THRESHOLD": 0;
    readonly "RUNEFORGING_ROOT_CATEGORY_ID": 210;
    readonly "RUNEFORGING_SKILL_LINE_ID": 960;
  };
  const PvpInfoConsts: {
    readonly "MAX_PVP_LOCK_LIST_MAP": 2;
    readonly "MaxPlayersPerInstance": 80;
  };
  const QuestLogConstsMainlineCamelot: {
    readonly "MAXIMUM_NUM_QUESTS_LOG_CAN_ACCEPT": 40;
  };
  const QuestWatchConsts: {
    readonly "MAX_QUEST_WATCHES": 25;
    readonly "MAX_WORLD_QUEST_WATCHES_AUTOMATIC": 1;
    readonly "MAX_WORLD_QUEST_WATCHES_MANUAL": 5;
  };
  const RaidMarkerConsts: {
    readonly "MAX_RAID_MARKERS": 8;
    readonly "MAX_RAID_TARGETS_RESTRICTED": 8;
    readonly "MAX_RAID_TARGETS_USER": 8;
    readonly "MAX_VALID_RAID_TARGETS": 0;
  };
  const RecentAlliesConsts: {
    readonly "PIN_EXPIRATION_WARNING_DAYS": 5;
  };
  const SpellBookSpellIDs: {
    readonly "SPELL_ID_DISMISS_PET": 2641;
  };
  const SpellCooldownConsts: {
    readonly "COMBAT_POTION_CATEGORY": 4;
    readonly "GLOBAL_RECOVERY_CATEGORY": 133;
    readonly "HEALTH_POTION_CATEGORY": 30;
    readonly "HEALTHSTONE_CATEGORY": 1711;
  };
  const TalentConsts: {
    readonly "NumTalentColumns": number;
  };
  const TalentTierConstants: {
    readonly "MAX_TALENT_TIERS": 7;
  };
  const TieredEntranceConsts: {
    readonly "TIERED_ENTRANCE_INFO_WORLD_TIER_DIFFICULTY_CHARACTER_ELEMENT_ID": 522;
    readonly "TIERED_ENTRANCE_TIER_SCORE_VALUE_MAP_ID": 3;
    readonly "TIERED_ENTRANCE_TIER_SCORE_VALUE_PLAYER_CONDITION_ID": 6;
    readonly "TIERED_ENTRANCE_TIER_SCORE_VALUE_TIER_LEVEL": 1;
  };
  const TimerunningConsts: {
    readonly "TIMERUNNING_ITEM_CTR": 2905;
    readonly "TIMERUNNING_LEGION_ARTIFACT_CTR": 4579;
    readonly "TIMERUNNING_SEASON_LEGION": 2;
    readonly "TIMERUNNING_SEASON_NONE": 0;
    readonly "TIMERUNNING_SEASON_PANDARIA": 1;
  };
  const TraitConsts: {
    readonly "COMMIT_COMBAT_TRAIT_CONFIG_CHANGES_SPELL_ID": 384255;
    readonly "INSPECT_TRAIT_CONFIG_ID": -1;
    readonly "MAX_COMBAT_TRAIT_CONFIGS": 40;
    readonly "STARTER_BUILD_TRAIT_CONFIG_ID": -2;
    readonly "VIEW_TRAIT_CONFIG_ID": -3;
  };
  const Transmog: {
    readonly "MainHandTransmogIsIndividualWeapon": -1;
    readonly "MainHandTransmogIsPairedWeapon": 0;
    readonly "NoTransmogID": 0;
  };
  const TransmogOutfitDataConsts: {
    readonly "CLEAR_TRANSMOG_OUTFIT_MANUAL_SPELL_ID": 1247917;
    readonly "EQUIP_TRANSMOG_OUTFIT_MANUAL_SPELL_ID": 1247613;
    readonly "TRANSMOG_OUTFIT_SLOT_NONE": -1;
  };
  const TTSConstants: {
    readonly "TTSRateDefault": 0;
    readonly "TTSRateMax": 10;
    readonly "TTSRateMin": -10;
    readonly "TTSVolumeDefault": 100;
    readonly "TTSVolumeMax": 100;
    readonly "TTSVolumeMin": 0;
  };
  const UICharacterClasses: {
    readonly "DeathKnight": 0;
    readonly "DemonHunter": 0;
    readonly "Druid": 0;
    readonly "Evoker": 0;
    readonly "Hunter": 0;
    readonly "Mage": 0;
    readonly "Monk": 0;
    readonly "Paladin": 0;
    readonly "Priest": 0;
    readonly "Rogue": 0;
    readonly "Shaman": 0;
    readonly "Warlock": 0;
    readonly "Warrior": 0;
  };
  const UnitAuraUIConstants: {
    readonly "GROUP_BUFF_VISUAL_ALERT_LIST_SIZE": 32;
    readonly "HIDDEN_GROUP_BUFF_LIST_SIZE": 32;
  };
  const UnitEventConstants: {
    readonly "MAX_UNIT_TOKENS_IN_EVENT": 4;
  };
  const UnitPowerSpellIDs: {
    readonly "COLLAPSING_STAR_PASSIVE_SPELL_ID": 1221167;
    readonly "COLLAPSING_STAR_SPELL_ID": 1221150;
    readonly "DARK_HEART_SPELL_ID": 1225789;
    readonly "SILENCE_THE_WHISPERS_SPELL_ID": 1227702;
    readonly "VOID_METAMORPHOSIS_SPELL_ID": 1217607;
  };
}
