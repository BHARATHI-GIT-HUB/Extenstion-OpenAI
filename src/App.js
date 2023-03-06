import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import { Box, Button, Container, Grid, TextField, Paper } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  async function handleSubmit() {
    setIsLoading(true);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        // prompt: `${prompt} is a budget-friendly option for basic computer usage,making it a good value for money purchase.Review:`,
        prompt: prompt,
        max_tokens: 100,
      });
      setResponse(completion.data.choices[0].text);
      setIsLoading(false);
    } catch (e) {
      alert("Error: ", e);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Box sx={{ width: "100%", mt: 4 }}>
        <Grid container>
          <Grid item xs={12}></Grid>
          <TextField
            fullWidth
            autoFocus
            label="Your text"
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <Paper sx={{ p: 3 }}>{response}</Paper>
          <Button
            fullWidth
            disableElevation
            variant="contained"
            disabled={isLoading}
            onClick={() => handleSubmit()}
            startIcon={
              isLoading && (
                <AutorenewIcon
                  sx={{
                    animation: "spin 2s linear infinite",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(360deg)",
                      },
                      "100%": {
                        transform: "rotate(0deg)",
                      },
                    },
                  }}
                />
              )
            }
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
