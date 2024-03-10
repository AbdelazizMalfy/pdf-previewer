import FileUpload from '../../client/src/components/FileUpload';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>
        Welcome to PDF previewer
      </h1>
      <FileUpload />
    </div>
  );
}

export default App;
