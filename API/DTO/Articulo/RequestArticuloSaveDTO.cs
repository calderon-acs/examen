namespace API.DTO.Articulo
{
    public class RequestArticuloSaveDTO
    {
        public int ArticuloID { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public string Imagen { get; set; }
        public int Stock { get; set; }
        public int TiendaID { get; set; }
    }
}
