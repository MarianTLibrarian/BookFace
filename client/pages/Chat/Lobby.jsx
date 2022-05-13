import React from "react";

function Lobby ({
  handleSubmit,
  connecting,
}) {
  return (
    <form style={{'border': '1px solid red'}} onSubmit={handleSubmit}>
      <button type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Join"}
      </button>
    </form>
  );
};

export default Lobby;