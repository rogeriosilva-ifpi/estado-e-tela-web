import type { ComponentProps } from "react";
import css from "./Botao.module.css";

type Variante = "primaria" | "secundaria"
  | "perigo" | "texto";

interface Props
  extends ComponentProps<"button"> {
  variante?: Variante;
}

// O <button> nativo com duas decisões já
// tomadas: o visual vem da variante, e o
// type é "button" (o nativo, num form,
// envia). No React 19, ref chega como prop.
export function Botao({
  variante = "primaria",
  type = "button",
  className,
  ...resto
}: Props) {
  const classes = [css.botao, css[variante],
    className].filter(Boolean).join(" ");
  return (
    <button type={type} className={classes}
      {...resto} />
  );
}
