import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";

import { Home } from "./app/Home/Home";
import { setAxiosBaseURL } from "./features/user/user.util";

function App() {
  useEffect(() => {
    setAxiosBaseURL();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
