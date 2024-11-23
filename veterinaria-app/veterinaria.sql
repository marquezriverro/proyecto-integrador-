CREATE DATABASE clinicaveterinaria; USE  clinicaveterinaria;
-- Crear tabla de propietarios
CREATE TABLE propietarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(255),
  telefono VARCHAR(20)
);
CREATE DATABASE veterinaria; USE mascota;
-- Crear tabla de mascotas
CREATE TABLE mascotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  edad INT NOT NULL,
  propietario_id INT,
  FOREIGN KEY (propietario_id) REFERENCES propietarios(id)
);
CREATE DATABASE veterinaria; USE citas;
-- Crear tabla de citas
CREATE TABLE citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mascota_id INT,
  fecha DATE NOT NULL,
  motivo TEXT,
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
);
CREATE DATABASE veterinaria; USE veterinario;
-- Crear tabla de veterinarios
CREATE TABLE veterinarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  especialidad VARCHAR(100)
);
CREATE DATABASE veterinaria; USE tratamiento;
-- Crear tabla de tratamientos
CREATE TABLE tratamientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cita_id INT,
  veterinario_id INT,
  descripcion TEXT,
  FOREIGN KEY (cita_id) REFERENCES citas(id),
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
);

-- Insertar propietarios
INSERT INTO propietarios (nombre, direccion, telefono) VALUES
('Juan Pérez', 'Calle Falsa 123', '123456789'),
('Ana Gómez', 'Avenida Siempre Viva 456', '987654321');

-- Insertar mascotas
INSERT INTO mascotas (nombre, tipo, edad, propietario_id) VALUES
('Fido', 'Perro', 4, 1),
('Misu', 'Gato', 2, 2);

-- Insertar veterinarios
INSERT INTO veterinarios (nombre, especialidad) VALUES
('Dr. Rodríguez', 'Cirugía'),
('Dra. Martínez', 'Dermatología');

-- Insertar citas
INSERT INTO citas (mascota_id, fecha, motivo) VALUES
(1, '2024-11-22', 'Revisión anual'),
(2, '2024-11-22', 'Vacunación');

-- Insertar tratamientos
INSERT INTO tratamientos (cita_id, veterinario_id, descripcion) VALUES
(1, 1, 'Examen físico completo y vacunas'),
(2, 2, 'Vacuna antirrábica');