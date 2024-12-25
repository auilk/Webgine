export function Clamp(min, value, max)
{
    return Math.max(Math.min(value, max), min);
}

export function RoundFloat(value, precision)
{
    return Math.round(value * precision) / precision;
}