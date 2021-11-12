import { SectionHeader } from "../../components/section-header";
import { Button } from "../../components/button";
import React from "react";
import { useRouter } from "next/router";
import { IoCreateOutline } from "react-icons/io5";

/**
 * 症状一覧ヘッダ
 */
export const SymptomIndexHeader = () => {
  const router = useRouter();

  // 編集クリック時
  const onEditClicked = async () => {
    await router.push('symptom/edit');
  };

  return (
    <SectionHeader>
      <h1>症状一覧</h1>
      <Button onClick={() => onEditClicked()}>
        <IoCreateOutline />
        症状の編集
      </Button>
    </SectionHeader>
  );
};
