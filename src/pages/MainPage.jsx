import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages,getAnswer } from "../redux/action";
import Select from "react-select";
import { clearAnswer } from "../redux/translateSlice";

const MainPage = () => {
  const [text, setText] = useState("");
  // kaynak ve hedef dil state'ine ilk değer verdik
  //   uygulama başladığı anda bu diller seçili gelir
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const areaRef = useRef();

  // uygulama başladığı anda diller çeker
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // state'ler arasında veri değimi yapar
  const handleClick = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // state'deki cevabı silme > ikinci area' temizlenir
    dispatch(clearAnswer());
    // ilk area timzlenir
    areaRef.current.value = "";
  };

  return (
    <>
      <h1>Çeviri +</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
            isLoading={store.isLoading}
            isDisabled={store.isLoading}
            className="select"
            options={store.languages}
          />
          <textarea
            ref={areaRef}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <button className="change-btn" onClick={handleClick}>
          Değiş
        </button>

        <div className="right">
          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            isLoading={store.isLoading}
            isDisabled={store.isLoading}
            className="select"
            options={store.languages}
          />
          <textarea disabled value={store.answer}></textarea>
        </div>
      </div>

      <button
        onClick={() => dispatch(getAnswer({ text, sourceLang, targetLang }))}
      >
        Çevir
      </button>
    </>
  );
};

export default MainPage;
