<!DOCTYPE html> 

<html lang="en"> 

<head> 

  <meta charset="UTF-8"> 

  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

  <title><%= title %> | Employee Management</title> 

  <link rel="stylesheet" href="/css/style.css"> 

</head> 

<body> 

  <nav class="navbar"> 

    <a href="/employees" class="brand">Employee Management</a> 

  

    <div class="nav-links"> 

      <% if (currentUser) { %> 

        <span>Hello, <%= currentUser.name %></span> 

        <a href="/employees">Employees</a> 

        <a href="/employees/create">Add Employee</a> 

        <form action="/logout" method="POST" class="inline-form"> 

          <button type="submit">Logout</button> 

        </form> 

      <% } else { %> 

        <a href="/login">Login</a> 

        <a href="/register">Register</a> 

      <% } %> 

    </div> 

  </nav> 

  

  <main class="container"> 

    <% if (success && success.length > 0) { %> 

      <div class="alert success"><%= success[0] %></div> 

    <% } %> 

  

    <% if (error && error.length > 0) { %> 

      <div class="alert error"><%= error[0] %></div> 

    <% } %> 

  

    <%- body %> 

  </main> 

</body> 

</html> 
