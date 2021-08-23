import { quickButtons, setQuickButtons } from "./Timer";

export const Settings = () => {
  return (
    <>
      <button
        onClick={() => {
          setQuickButtons({ ...quickButtons, on1: { duration: 1 } });
        }}
      ></button>
    </>
  );
};
