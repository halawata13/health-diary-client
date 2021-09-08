import React from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SWRConfig, SWRConfiguration } from "swr";
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import jaTranslation from '../locales/ja.json';
import 'ress';
import '../styles/style.css';
import axios from 'axios';
import { environment } from '../config/environment';
import dynamic from 'next/dynamic';
import { Container } from "../components/container";

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ja: {
        translation: jaTranslation
      }
    },
    lng: 'ja',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const swrConfig: SWRConfiguration = {
  fetcher: args => axios.get(environment.baseUrl + args).then(res => res.data),
  revalidateOnFocus: false,
};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const CSRComponent = dynamic(() => import('../components/csr-component'), { ssr: false });

  return (
    <React.Fragment>
      <CSRComponent>
        <SWRConfig value={swrConfig}>
          <RecoilRoot>
            <Container>
              <Component {...pageProps} />
            </Container>
          </RecoilRoot>
        </SWRConfig>
      </CSRComponent>
    </React.Fragment>
  );
}
