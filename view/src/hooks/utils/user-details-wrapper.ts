import { NftEventType } from '@flipguard/domain';
import {
    IntegrationType,
    MessageTemplateType,
    Permission,
    ReceivedItemSource,
    UserDetails,
    UserMetadata,
    WalletChain,
} from '@flipguard/webapp-api';

export class UserDetailsWrapper {
    public readonly metadata: UserMetadata;

    private constructor(public readonly details: UserDetails) {
        this.metadata = details.metadata;
    }

    public static wrap = (details: UserDetails) => new UserDetailsWrapper(details);

    public get id() {
        return this.details.id;
    }

    public get model() {
        return this.details;
    }

    public get referrals() {
        return this.details.referrals;
    }

    public getWalletAddress = (chain: WalletChain) => {
        return this.details.wallets[chain].address;
    };

    public get limits() {
        return this.details.limits;
    }

    public get items() {
        return this.details.items;
    }

    public get flipBotConfigs() {
        return Object.values(this.details.metadata.flipBotConfigs);
    }

    public isBiddingBotActive = (botId: string) => {
        return this.details.metadata.biddingBots[botId] && this.details.metadata.biddingBots[botId].active;
    };

    public usedBiddingBotsIds = (): string[] => {
        return Object.keys(this.metadata.biddingBots);
    };

    public usedIntegrationIds = (type: IntegrationType): string[] => {
        return this.details.metadata.integrations.filter((i) => i.type === type).map((i) => i.id);
    };

    public usedMessageTemplatesIds = (templateType: MessageTemplateType, eventType: NftEventType): string[] => {
        return this.details.metadata.templates
            .filter((t) => t.messageType === templateType)
            .filter((t) => t.eventType === eventType)
            .map((t) => t.id);
    };

    public canUseRefCode = (): boolean => {
        const items = this.details.items;
        return items.filter((i) => i.source !== ReceivedItemSource.TRIAL).length === 0;
    };

    public hasOneOfPermissions = (...permissions: Permission[]): boolean => {
        return permissions.some((p) => this.details.permissions.includes(p));
    };

    public hasPermission = (permission: Permission): boolean => {
        return this.details.permissions.includes(permission);
    };
}
