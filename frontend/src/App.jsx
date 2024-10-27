import { useTheme } from "./hooks";

const App = () => {
  const { themeMode, changeTheme } = useTheme();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">{themeMode}</h1>
      <button onClick={changeTheme}>Toggle Theme</button>
    </div>
  );
};

export default App;
