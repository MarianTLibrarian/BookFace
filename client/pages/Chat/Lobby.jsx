import React from "react";

function Lobby ({
  handleSubmit,
  connecting,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Join"}
      </button>
    </form>
  );
};

export default Lobby;