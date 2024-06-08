import React, { useState } from "react";
import sdk from "@crossmarkio/sdk";
import Image from "next/image";

function App() {
  const [signInResponse, setSignInResponse] = useState("");
  const [sessionUserResponse, setSessionUserResponse] = useState("");
  const [signTransactionTxblob, setSignTransactionTxblob] = useState("");
  const [submitTransactionResponse, setSubmitTransactionResponse] =
    useState("");

  const signIn = async () => {
    // Sign in logic here
    let address = (await sdk.async.signInAndWait()).response.data.address;
    return setSignInResponse(address);
  };

  const getUserSession = async () => {
    // Session logic here
    let id = sdk.session.user?.id;
    if (id) return setSessionUserResponse(id);
  };

  const signTransaction = async () => {
    // Sign transaction logic here
    let resp = await sdk.async.signAndWait({
      TransactionType: "Payment",
      Account: signInResponse,
      Destination: "rK8jihXBZCFWZqX95SET3CCi1WdRgZQwex", // Add any destination address here
      Amount: "11000000", // XRP in drops
    });
    if (resp) return setSignTransactionTxblob(resp.response.data.txBlob);
  };

  const submitTransaction = async () => {
    // Submit transaction logic here
    let resp = await sdk.async.submitAndWait(
      signInResponse,
      signTransactionTxblob
    );
    if (resp)
      return setSubmitTransactionResponse(resp.response.data.resp.result.hash);
  };

  return (
    <div>
      <div className="wrapper">
        <h1>Starter Template</h1>
      </div>

      <main className="main">
        <div>
          <div className="content">
            <button onClick={signIn} className="rounded-button">
              Sign In and Wait
            </button>
            <div style={{ paddingLeft: "10rem", paddingTop: "5rem" }}></div>
            <textarea
              style={{ width: "75%", height: "10rem", color: "black" }}
              id="response1"
              readOnly
              value={`Address: ${signInResponse}`}
            ></textarea>
          </div>
          <div className="divider"></div>
          <div className="content">
            <button onClick={getUserSession} className="rounded-button">
              Get Session
            </button>
            <div style={{ paddingLeft: "11rem", paddingTop: "5rem" }}></div>
            <textarea
              style={{ width: "75%", height: "10rem", color: "black" }}
              id="response2"
              readOnly
              value={`Current User ID: ${sessionUserResponse}`}
            ></textarea>
          </div>
          <div className="divider"></div>
          <div className="content">
            <button onClick={signTransaction} className="rounded-button">
              Sign Transaction
            </button>
            <div style={{ paddingLeft: "10rem", paddingTop: "5rem" }}></div>
            <textarea
              style={{ width: "75%", height: "10rem", color: "black" }}
              id="response3"
              value={`TxBlob: ${signTransactionTxblob}`}
            ></textarea>
          </div>
          <div className="divider"></div>
          <div className="content">
            <button onClick={submitTransaction} className="rounded-button">
              Submit Transaction
            </button>
            <div style={{ paddingLeft: "10rem", paddingTop: "5rem" }}></div>
            <textarea
              style={{ width: "75%", height: "10rem", color: "black" }}
              id="response4"
              value={`Hash: ${submitTransactionResponse}`}
            ></textarea>
          </div>
          <div className="divider"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
