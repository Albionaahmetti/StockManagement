namespace ReactApp1.Server.Helpers
{
    public class FileService
    {
        private readonly IWebHostEnvironment _environment;
        public FileService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        public async Task<string?> SaveFileAsync(IFormFile file)
        {
            string folder = "uploads";
            if (file == null || file.Length == 0)
                return null;

            string uploadDirectory = Path.Combine(_environment.ContentRootPath, folder);

            if (!Directory.Exists(uploadDirectory))
                Directory.CreateDirectory(uploadDirectory);

            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            string filePath = Path.Combine(uploadDirectory, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
                await file.CopyToAsync(fileStream);

            return Path.Combine(folder, uniqueFileName).Replace("\\", "/");
        }
    }
}
