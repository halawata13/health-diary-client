import { Button } from "./button";
import { IoArrowUndoOutline } from "react-icons/all";
import { css } from "@emotion/css";
import { useRouter } from "next/router";
import { SectionHeader } from "./section-header";

/**
 * 症状編集画面ヘッダ
 */
export const SymptomEditHeader = () => {
  const router = useRouter();

  return (
    <SectionHeader>
      <div className={headerStyle}>
        <Button iconOnly={true} onClick={() => router.back()}><IoArrowUndoOutline /></Button>
        <h1>症状一覧</h1>
      </div>
    </SectionHeader>
  );
};

const headerStyle = css`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;
