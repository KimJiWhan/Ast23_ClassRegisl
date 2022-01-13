import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// themes
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import styled from "styled-components";
// components
import LoginView from "./components/views/LoginView";
import MainView from "./components/views/MainView";

function App() {
  let [StartTime, StartTimeSet] = useState(); //수강신청 시작시간 저장 변수
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const onHourChange = (e) => {
    setHour(e.target.value);
  };
  const onMinChange = (e) => {
    setMin(e.target.value);
  };
  function output0() {
    return (
      <InputNum
        placeholder="'시'를 입력하시오."
        value={hour}
        onChange={onHourChange}
      />
    );
  }
  function output1() {
    return (
      <InputNum
        placeholder="'분'을 입력하시오."
        value={min}
        onChange={onMinChange}
      />
    );
  }
  
  function TimeReturn0() { //수강신청 시작시간 저장 변수 StartTime 설정 함수
    var TimeRef1 = new Date.now();
    var MinCopy = {...min};
    var HourCopy = {...hour};
    if (HourCopy == TimeRef1.getHours()) {
      if (MinCopy <= TimeRef1.getMinutes()) {
        TimeRef1.setHours(HourCopy);
        TimeRef1.setMinutes(MinCopy);
        TimeRef1.setDate(TimeRef1.getDate()+1);  
      }
    } else if (HourCopy < TimeRef1.getHours()) {
      TimeRef1.setHours(HourCopy);
      TimeRef1.setMinutes(MinCopy);
      TimeRef1.setDate(TimeRef1.getDate()+1);
    } else {
      TimeRef1.setHours(HourCopy);
      TimeRef1.setMinutes(MinCopy);
    }

    StartTimeSet( TimeRef1.getTime() );
  }

  function TimeReturn1() { //수강 신청 시간과 버튼 클릭 시간 차이를 보여주는 함수
    var TimeRef2 = new Date.now();
    var EndTime = TimeRef2.getTime();
    var timeDifference = (EndTime - StartTime) / 1000;
    if (Endtime < StartTime) {
      alert('수강신청 기간이 아닙니다. (' + -timeDifference + '초 남음)');
    } else {
      alert('설정한 시각보다 ' + timeDifference + '초 늦습니다!');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginView output0={output0()} output1={output1()} />}
        />
        <Route
          exact
          path="/main"
          element={<MainView inputHour={hour} inputMin={min} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

const InputNum = styled.input`
  width: 15.1rem;
  height: 2.7rem;
  border-radius: 0rem;
  border: 0.1rem solid #dddddd;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
