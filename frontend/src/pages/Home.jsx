import {
  Box,
  Button,
  Container,
  HStack,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import Loading from "../components/Loading";
import axios from "axios";
import Markdown from "react-markdown";

const Home = () => {
  const [code, setCode] = useState("//Write your code here");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "# Hi there, *Output will be here...*!"
  );

  //handleCodeEditor
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  //handleCONVERT
  const handleConvert = async () => {
    if (code && language) {
      let obj = {
        code: code,
        language: language,
      };
      setLoading(true);
      try {
        const response = await axios.post(
          "https://codeconverter-7z3j.onrender.com/convert",
          obj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        setMessage(response?.data?.msg);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  //handleDEBUG
  const handleDebug = async () => {
    if (code) {
      let obj = {
        code: code,
      };
      setLoading(true);
      try {
        const response = await axios.post(
          "https://codeconverter-7z3j.onrender.com/debug",
          obj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        setMessage(response?.data?.msg);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  //handleQUALITYCHECK
  const handleQualityCheck = async () => {
    if (code) {
      let obj = {
        code: code,
      };
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/qualitycheck",
          obj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        setMessage(response?.data?.msg);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <Box bg={"#191259"} color={"white"}>
      <Stack
        direction={{ base: "column", md: "row", lg: "row" }}
        justifyContent={"space-around"}
        bg={"#682aa1"}
        padding={"15px"}
      >
        <HStack>
          <Select
            bg="tomato"
            borderColor="tomato"
            color="black"
            width={"200px"}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            isDisabled={loading}
          >
            <option value="javaScript">JavaScript</option>
            <option value="python">Python</option>
            <option value="php">php</option>
            <option value="java">Java</option>
          </Select>
          <Button
            colorScheme="green"
            onClick={handleConvert}
            isDisabled={loading}
          >
            CONVERT
          </Button>
        </HStack>
        <HStack justifyContent={"center"}>
          <Button colorScheme="red" onClick={handleDebug} isDisabled={loading}>
            DEBUG
          </Button>
          <Button
            colorScheme="telegram"
            onClick={handleQualityCheck}
            isDisabled={loading}
          >
            QUALITY CHECK
          </Button>
        </HStack>
      </Stack>

      <Container
        maxW={"100%"}
        style={{ minHeight: "calc(100vh - 195px)", overflow: "hidden" }}
        margin={"0px"}
        padding={"0px"}
      >
        <HStack margin={"0px"} spacing={0} bg={"black"}>
          <Box width={"50%"}>
            <CodeEditor code={code} onChange={handleCodeChange} />
          </Box>
          <Box
            overflowY={"auto"}
            className="custom-scrollbar"
            width={"50%"}
            height={"calc(100vh - 195px)"}
            padding={"10px"}
          >
            {loading ? (
              <Stack
                justifyContent={"center"}
                height={"calc(100vh - 195px)"}
                alignItems={"center"}
              >
                <Loading />
              </Stack>
            ) : (
              <Markdown>{message}</Markdown>
            )}
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};

export default Home;
