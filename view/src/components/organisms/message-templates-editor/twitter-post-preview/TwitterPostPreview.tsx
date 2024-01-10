import { render } from '@flipguard/commons';
import { TweetTemplate } from '@flipguard/webapp-api';

import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { Tweet } from '../../../molecules/twitter/Tweet';
import { ExampleNft, getRandomNftExample } from '../examples/examples';

type Props = {
    exampleNft?: ExampleNft;
    template: TweetTemplate;
    hideAvatar?: boolean;
    hideName?: boolean;
};

export const TwitterPostPreview = ({
    exampleNft = getRandomNftExample(),
    template,
    hideAvatar = false,
    hideName = false,
}: Props) => {
    const isMobile = isViewMobile('sm');

    return (
        <Tweet
            name={'Your Twitter Bot'}
            handle={'xyz'}
            hideAvatar={isMobile || hideAvatar}
            hideName={hideName}
            content={render(template.description, exampleNft.variables)}
            image={template.includeMedia ? exampleNft.imageUrl : undefined}
        />
    );
};
