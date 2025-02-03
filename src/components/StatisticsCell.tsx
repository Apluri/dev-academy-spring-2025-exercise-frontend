import { Typography, useTheme } from "@mui/material";

type Props = {
  unitType: "mWh" | "c/kWh" | "kWh" | "hours";
  value: number | undefined;
  digits?: number;
};

const StatisticsCell = ({ unitType, value, digits }: Props) => {
  const theme = useTheme();
  if (value === undefined) return undefined;

  return (
    <Typography fontSize={theme.typography.fontSize}>{`${value.toFixed(
      digits
    )} ${unitType}`}</Typography>
  );
};

export default StatisticsCell;
