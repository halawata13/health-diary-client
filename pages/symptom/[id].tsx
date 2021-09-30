import useSWR from "swr";
import { Symptom } from "../../types";
import { AxiosError } from "axios";
import { useState } from "react";
import { DateTime } from "luxon";
import { UserService } from "../../services/user.service";
import { useRouter } from "next/router";
import { getFetcher } from "../../services/base.service";
import { getErrorComponent } from "../../components/error";
import { getLoadingComponent } from "../../components/loading";

export default function Detail() {
  const user = UserService.load();
  const router = useRouter();
  const [ from, setFrom ] = useState(DateTime.now().minus({ years: 1 }));
  const [ to, setTo ] = useState(DateTime.now());
  const url = `/symptom?id=${router.query.id}&fromYear=${from.year}&fromMonth=${from.month}&toYear=${to.year}&toMonth=${to.month}`;
  const { data: symptom, error: symptomError } = useSWR<Symptom, AxiosError>(url, getFetcher(url, user));

  if (symptomError || user == null) {
    return getErrorComponent(symptomError);
  }

  if (symptom === undefined) {
    return getLoadingComponent();
  }

  return (
    <>

    </>
  );
}
