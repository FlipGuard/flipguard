import { useTeamContext } from '../../../contexts/team-context';
import { useAuth } from '../../../hooks/use-auth';
import { CustomSelect } from '../../atoms/inputs/select/CustomSelect';

export const TeamSelect = () => {
    const { authenticated } = useAuth();
    const { scopedTeam, setScopedTeam, teams } = useTeamContext();

    return (
        <CustomSelect
            sx={{ flexGrow: 1 }}
            label={'Team'}
            options={[...teams.map((t) => ({ label: t.name, value: t.id })), { label: 'None', value: '' }]}
            onChange={(e) => setScopedTeam(e.target.value)}
            value={scopedTeam?.id ?? ''}
            disabled={!authenticated || teams.length === 0}
            select
        />
    );
};
