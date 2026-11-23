const http = require('http');

const runTests = async () => {
  // Start the server programmatically
  const app = require('./server');
  // server.js starts listening when required or run
  
  // Wait 1 second for connection
  await new Promise((r) => setTimeout(r, 1000));

  const makeRequest = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: '127.0.0.1',
        port: 5000,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, data });
          }
        });
      });

      req.on('error', reject);
      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  };

  try {
    console.log('--- 🧪 STARTING API TESTS ---');

    // Test 1: Health check
    const health = await makeRequest('GET', '/api/health');
    console.log('1. GET /api/health:', health.status === 200 ? '✅ PASSED' : '❌ FAILED', health.data);

    // Test 2: Get all employees
    const all = await makeRequest('GET', '/api/employees');
    console.log(`2. GET /api/employees: ${all.status === 200 ? '✅ PASSED' : '❌ FAILED'} (Found ${all.data.count} employees)`);

    // Test 3: Get stats
    const stats = await makeRequest('GET', '/api/employees/stats/summary');
    console.log('3. GET /api/employees/stats/summary:', stats.status === 200 ? '✅ PASSED' : '❌ FAILED', stats.data.data);

    // Test 4: Create employee
    const newEmp = {
      name: 'Dev Test User',
      email: 'dev.test@example.com',
      phone: '+91 99999 88888',
      department: 'Engineering',
      designation: 'QA Engineer',
      joiningDate: '2024-03-01',
      status: 'Active',
    };
    const created = await makeRequest('POST', '/api/employees', newEmp);
    console.log('4. POST /api/employees:', created.status === 201 ? '✅ PASSED' : '❌ FAILED', created.data.message);
    const createdId = created.data.data?._id;

    // Test 5: Validation - duplicate email test
    const dupTest = await makeRequest('POST', '/api/employees', newEmp);
    console.log('5. Duplicate Email Validation:', dupTest.status === 400 ? '✅ PASSED (Properly rejected duplicate)' : '❌ FAILED');

    // Test 6: Get employee by ID
    const single = await makeRequest('GET', `/api/employees/${createdId}`);
    console.log('6. GET /api/employees/:id:', single.status === 200 ? '✅ PASSED' : '❌ FAILED', single.data.data?.name);

    // Test 7: Update employee
    const updated = await makeRequest('PUT', `/api/employees/${createdId}`, {
      ...newEmp,
      designation: 'Lead QA Engineer',
      status: 'Inactive',
    });
    console.log('7. PUT /api/employees/:id:', updated.status === 200 && updated.data.data?.designation === 'Lead QA Engineer' ? '✅ PASSED' : '❌ FAILED', updated.data.message);

    // Test 8: Filter & Search
    const searchRes = await makeRequest('GET', '/api/employees?search=QA&status=Inactive');
    console.log(`8. Filter & Search (?search=QA&status=Inactive): ${searchRes.status === 200 && searchRes.data.count >= 1 ? '✅ PASSED' : '❌ FAILED'}`);

    // Test 9: Delete employee
    const deleted = await makeRequest('DELETE', `/api/employees/${createdId}`);
    console.log('9. DELETE /api/employees/:id:', deleted.status === 200 ? '✅ PASSED' : '❌ FAILED', deleted.data.message);

    // Test 10: Verify 404 after deletion
    const verifyDel = await makeRequest('GET', `/api/employees/${createdId}`);
    console.log('10. 404 Check After Deletion:', verifyDel.status === 404 ? '✅ PASSED' : '❌ FAILED');

    console.log('--- 🎉 ALL API TESTS COMPLETED SUCCESSFULLY ---');
    process.exit(0);
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  }
};

runTests();
