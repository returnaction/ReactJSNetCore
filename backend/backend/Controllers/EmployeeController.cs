using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Employee>?  employee = _context.Employees.ToList();

            return Ok(employee);
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            if (employee is null)
                return BadRequest();

            _context.Employees.Add(employee);
            _context.SaveChanges();
            return Ok("Added Successfully");
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Employee employee)
        {
            if (employee is null)
                return BadRequest();

            Employee? existEmployee = _context.Employees.FirstOrDefault(e => e.EmployeeId == id);

            existEmployee.EmployeeName = employee.EmployeeName;
            existEmployee.DateOfJoining = employee.DateOfJoining;
            existEmployee.PhotoFileName = employee.PhotoFileName;
            existEmployee.Department = employee.Department;
            existEmployee.PhotoFileName = employee.PhotoFileName;

            _context.SaveChanges();

            return Ok("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Employee? employee = _context.Employees.FirstOrDefault(e => e.EmployeeId == id);
            if (employee is null)
                return NotFound();

            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return Ok("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public IActionResult SaveFile()
        {
            try
            {
                IFormCollection httpRequest = Request.Form;
                IFormFile postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                string physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (FileStream stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return Ok(filename);

            }
            catch (Exception)
            {
                return Ok("anonymous.png");
            }
        }
    }
}
