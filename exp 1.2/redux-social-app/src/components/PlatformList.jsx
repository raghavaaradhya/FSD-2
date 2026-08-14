import { useSelector, useDispatch } from "react-redux";
import { deletePlatform } from "../features/platforms/platformsSlice";

function PlatformList() {
  const dispatch = useDispatch();

  const platforms = useSelector(
    (state) => state.platforms
  );

  return (
    <div>
      <h2>Platforms</h2>

      {platforms.ids.map((id) => {
        const platform = platforms.entities[id];

        return (
          <div className="platform" key={platform.id}>
            <span>{platform.name}</span>

            <button
              onClick={() =>
                dispatch(deletePlatform(platform.id))
              }
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlatformList;