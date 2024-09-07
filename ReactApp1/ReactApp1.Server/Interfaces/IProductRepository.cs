using ReactApp1.Server.Classes;

namespace ReactApp1.Server.Interfaces
{
    public interface IProductRepository
    {
         Task Add(Product product);
    }
}
