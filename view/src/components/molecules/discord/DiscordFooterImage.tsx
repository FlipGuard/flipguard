type Props = {
    src: string;
};

export const DiscordFooterImage = ({ src }: Props) => (
    <img
        src={src}
        alt={''}
        style={{
            borderRadius: '50%',
            flexShrink: 0,
            height: '20px',
            marginRight: '8px',
            width: '20px',
        }}
    />
);
