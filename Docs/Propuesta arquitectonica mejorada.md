# Propuesta Arquitectónica Mejorada de Infraestructura AWS - Proyecto Rin'ne

## 1. Arquitectura General Actualizada

- **Frontend**: React con Vite, servido como contenido estático por **Nginx**.
- **Backend**: Node.js + Express (TypeScript), gestionado por **PM2**.
- **Base de datos**: PostgreSQL 15 en contenedor Docker.
- **Almacenamiento de archivos**: Actualmente local en la instancia EC2
- **Red**: **Security Groups** configurados para puertos 22 (SSH), 80 (HTTP) y 3000 (API).
- **Instancia**: **t2.micro (Free Tier) con **Elastic IP** y **Nginx** como reverse proxy.

---

## 2. Mejoras Propuestas

### 2.1. Migración de Almacenamiento a S3
- **Ventajas**: alta disponibilidad, reducción de carga de disco en EC2, costos por uso.
- **Implementación**: Utilizar el SDK de AWS (`aws-sdk`) con buckets privados; servir archivos mediante URLs firmadas.

### 2.2. Base de datos Administrada (RDS) (opcional)
- **Ventajas**: backups automáticos, escalado sin downtime, alta disponibilidad.
- **Plan**: En fase de crecimiento, migrar a **Amazon RDS PostgreSQL** con instancia `db.t3.micro` (Free Tier).

### 2.3. Balanceador de Carga (ELB) y Auto‑Scaling
- Preparar la arquitectura para múltiples instancias EC2 usando **Application Load Balancer (ALB)**.
- Configurar **Auto Scaling Group** con política de escalado basada en CPU.

### 2.4. Seguridad y Gestión de Secretos
- Reemplazar variables de entorno en código por **AWS Secrets Manager** o **Parameter Store**.
- Habilitar **HTTPS** con **AWS Certificate Manager (ACM)** y configurar Nginx para terminar TLS.

### 2.5. Monitoreo y Logging Avanzado
- Integrar **CloudWatch Logs** y **CloudWatch Metrics**.
- Configurar alarmas para uso de CPU, memoria y errores de aplicación.
- Centralizar logs de PM2 y Nginx en CloudWatch.

### 2.6. CI/CD con GitHub Actions y Elastic Beanstalk (o ECS)
- Pipeline que ejecuta pruebas, construye la aplicación, crea una imagen Docker y la despliega a **Elastic Beanstalk** (o **ECS Fargate**) para simplificar el manejo de infra.

---

## 3. Diagrama de Arquitectura Mejorada
```mermaid
flowchart LR
    Client[Cliente Web] -->|HTTPS| ALB[Application Load Balancer]
    ALB --> EC2[EC2 Instances]
    EC2 --> Nginx[Nginx Reverse Proxy]
    Nginx --> Backend[Node.js/Express]
    Backend --> RDS[Amazon RDS PostgreSQL]
    Backend --> S3[Amazon S3 (Objetos)]
    Backend --> CloudWatch[CloudWatch Logs & Metrics]
    Backend --> Secrets[Secrets Manager]
```

---

## 4. Costos Estimados (Detalle)

Para ver el desglose completo de costos, consulte el archivo [Costos estimados](file:///c:/Users/LENOVO/Downloads/Rinne%20Docs/Docs/Costos_estimados.md).

---

## 5. Roadmap de Implementación
1. **Semana 1**: Configurar bucket S3 y migrar carga estática.
2. **Semana 2**: Integrar Secrets Manager y habilitar HTTPS.
3. **Semana 3**: Deploy de RDS y migrar datos.
4. **Semana 4**: Configurar ALB y Auto Scaling.
5. **Semana 5**: Implementar CloudWatch dashboards y alarmas.
6. **Semana 6**: Crear pipeline CI/CD con GitHub Actions.

---

## 6. Conclusión
Con estas mejoras, la infraestructura de **Rin'ne** será más segura, escalable y preparada para producción, manteniendo costos mínimos durante la fase inicial.
