import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'wouter';

import { EXTENSIONS_KEY, getExtensions } from '../../api/requests/extensions';
import { RoutePath } from '../../config/constants/navigation';
import { ExtensionsEdit } from './ExtensionsEdit';

type Props = {
    extensionId: string;
};

export const ExtensionsEditRoute = ({ extensionId }: Props) => {
    const { isLoading, data: extensions } = useQuery([EXTENSIONS_KEY], getExtensions);

    if (isLoading || extensions === undefined) {
        return null;
    }

    const extension = extensions.find((e) => e.id === extensionId);
    if (!extension) {
        return <Redirect to={RoutePath.Extensions} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <ExtensionsEdit extension={extension} />
        </Grid>
    );
};
