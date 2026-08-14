import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlatform } from "../features/platforms/platformsSlice";

function PlatformForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    const newPlatform = {
      id: Date.now(),
      name: name,
    };

    dispatch(addPlatform(newPlatform));

    setName("");
  };

  return (
    <div>
      <h2>Add Platform</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter platform name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">
          Add Platform
        </button>
      </form>
    </div>
  );
}

export default PlatformForm;