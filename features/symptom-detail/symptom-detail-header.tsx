import { css } from "@emotion/css";
import { Button } from "../../components/button";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { SectionHeader } from "../../components/section-header";
import { SymptomGraphType, SymptomSelector } from "./symptom-graph-selector";

interface Props {
  name: string;
  onChange: (type: SymptomGraphType) => void;
}

/**
 * 症状詳細ヘッダ
 */
export const SymptomDetailHeader = (props: Props) => {
  const router = useRouter();

  return (
    <SectionHeader>
      <div className={headerStyle}>
        <Button iconOnly={true} onClick={() => router.back()}><IoArrowUndoOutline /></Button>
        <h1>{props.name}</h1>
      </div>
      <SymptomSelector onChange={props.onChange} />
    </SectionHeader>
  );
}

const headerStyle = css`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;
