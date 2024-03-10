import { Test, TestingModule } from '@nestjs/testing';
import * as pdfParse from 'pdf-parse';
import { FileUploadController } from './file-upload.controller';

jest.mock('pdf-parse', () => jest.fn());

describe('FileUploadController', () => {
  let controller: FileUploadController;
  let mockResponse: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
    }).compile();

    controller = module.get<FileUploadController>(FileUploadController);

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 status when no file is uploaded', async () => {
    await controller.uploadFile(undefined, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('No PDF file uploaded.');
  });

  it('should process PDF file and return text', async () => {
    const mockPdfFile = {
      buffer: Buffer.from('Somse fake PDF content'),
    };

    const mockPdfText = 'Extracted text from PDF.';
    (pdfParse as jest.Mock).mockResolvedValue({ text: `\n${mockPdfText}` });

    await controller.uploadFile(mockPdfFile, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith(mockPdfText);
    expect(pdfParse).toHaveBeenCalledWith(mockPdfFile.buffer);
  });

  it('should return 500 status when PDF parsing fails', async () => {
    const mockPdfFile = {
      buffer: Buffer.from(
        'Some fake PDF content likely to cause parsing failure',
      ),
    };

    (pdfParse as jest.Mock).mockRejectedValue(
      new Error('Failed to parse PDF file'),
    );

    await controller.uploadFile(mockPdfFile, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith('Failed to parse the file');
  });
});
