using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUDWebAPI.Models;

namespace CRUDWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CancionsController : ControllerBase
    {
        private readonly CancionContext _context;

        public CancionsController(CancionContext context)
        {
            _context = context;
        }

        // GET: api/Cancions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cancion>>> GetCanciones()
        {
          if (_context.Canciones == null)
          {
              return NotFound();
          }
            return await _context.Canciones.ToListAsync();
        }

        // GET: api/Cancions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cancion>> GetCancion(long id)
        {
          if (_context.Canciones == null)
          {
              return NotFound();
          }
            var cancion = await _context.Canciones.FindAsync(id);

            if (cancion == null)
            {
                return NotFound();
            }

            return cancion;
        }

        // PUT: api/Cancions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCancion(long id, Cancion cancion)
        {
            if (id != cancion.Id)
            {
                return BadRequest();
            }

            _context.Entry(cancion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CancionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cancions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cancion>> PostCancion(Cancion cancion)
        {
          if (_context.Canciones == null)
          {
              return Problem("Entity set 'CancionContext.Canciones'  is null.");
          }
            _context.Canciones.Add(cancion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCancion", new { id = cancion.Id }, cancion);
        }

        // DELETE: api/Cancions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCancion(long id)
        {
            if (_context.Canciones == null)
            {
                return NotFound();
            }
            var cancion = await _context.Canciones.FindAsync(id);
            if (cancion == null)
            {
                return NotFound();
            }

            _context.Canciones.Remove(cancion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CancionExists(long id)
        {
            return (_context.Canciones?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
