import { DialogContentText, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

type Props = {
    affectedBots: string[];
};

export const AffectedBotsDialogBox = ({ affectedBots }: Props) => {
    if (affectedBots.length > 0) {
        return (
            <>
                <DialogContentText>Affected bots:</DialogContentText>
                <List sx={{ padding: 0, paddingTop: '4px' }}>
                    {affectedBots.map((botName, idx) => (
                        <ListItem key={idx} sx={{ padding: 0 }}>
                            •
                            <ListItemText sx={{ marginLeft: '6px' }} primary={botName} />
                        </ListItem>
                    ))}
                </List>
            </>
        );
    } else {
        return <DialogContentText>No affected bots ✔</DialogContentText>;
    }
};
