import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, styled } from '@mui/material';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    background: theme.palette.primary.main,
    border: `1px solid ${theme.palette.inputBorder.main}`,
    borderRadius: '4px',
    '&::before': {
        height: '0px',
    },
    '&.Mui-disabled': {
        background: 'none',
    },
}));

const StyledSummary = styled(AccordionSummary)({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: '12px',
    },
});

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: 0,
    overflowX: 'scroll',
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.primaryBorder.main} ${theme.palette.primary.dark}`,
    '&::-webkit-scrollbar': {
        width: '0.3em',
        height: '0.3em',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.primaryBorder.main}`,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: `#3a3a3a`,
    },
}));

type Props = AccordionProps & {
    label: string;
};

export const CustomAccordion = (props: Props) => {
    return (
        <StyledAccordion disableGutters elevation={0} square {...props}>
            <StyledSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}>
                {props.label}
            </StyledSummary>
            <StyledAccordionDetails>{props.children}</StyledAccordionDetails>
        </StyledAccordion>
    );
};
