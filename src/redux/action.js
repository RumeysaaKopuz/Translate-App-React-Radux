import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from './../helpers/constants';

// dillerin verisini çeker
export const getLanguages = createAsyncThunk(
  'translate/getLanguages',
  async () => {
    // asenkron işlemler
    const res = await axios.get(
      'https://text-translator2.p.rapidapi.com/getLanguages',
      options
    );

    const languages = res.data.data.languages;

    /*
     * diziyi dönüp
     * bütün code key'lerini  value'a çevirir
     * bütün name key'lerini label'çevirir
     */
    const newLanguages = languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));

    // store'a gönderilecek değeri return edilirr
    return newLanguages;
  }
);

// çeviri yapar
export const getAnswer = createAsyncThunk(
  'translate/getAnwer',
  async (props) => {
    // istek için gerekli olan ayarlar
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', props.sourceLang.value);
    encodedParams.set('target_language', props.targetLang.value);
    encodedParams.set('text', props.text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key':
          '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: encodedParams,
    };

    // isteği yapma
    const res = await axios.request(options);

    // çevrilmiş yazıya erişme
    const answer = res.data.data.translatedText;

    // veriye slice'ta erişebilmek için return ediyoruz
    return answer;
  }
);