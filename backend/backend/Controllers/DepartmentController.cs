using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        //private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public DepartmentController( ApplicationDbContext context)
        {
            //_configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Department>? deparments = _context.Departments.ToList();

            return Ok(deparments);
        }

        [HttpPost]
        public IActionResult Post(Department department)
        {
            if (department is null)
                return BadRequest();

            _context.Departments.Add(department);
            _context.SaveChanges();

            return Ok("Added Successfully");
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Department department)
        {
            if (department is null)
                return BadRequest();

            Department? existDepartment = _context.Departments.FirstOrDefault(d => d.DepartmentId == id);

            if (existDepartment is null)
                return NotFound();

            existDepartment.DepartmentName = department.DepartmentName;

            _context.SaveChanges();

            return Ok("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Department? department = _context.Departments.FirstOrDefault(d => d.DepartmentId == id);
            if (department is null)
                return NotFound();

            _context.Departments.Remove(department);
            _context.SaveChanges();

            return Ok("Deleted Successfully");
        }
        
    }
}
