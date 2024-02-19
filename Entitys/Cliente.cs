using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entitys
{
    public class Cliente
    {
        public int ClienteID { get; set; } // Clave primaria
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
    }
}
