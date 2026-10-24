export const projects = [
  {
    slug: 'bank-app',
    name: 'Bank App',
    theme: 'coral',
    type: 'API + aplicación móvil',
    title: 'Una operación. Dos saldos que deben coincidir.',
    seoTitle: 'Bank App: API de transferencias con Laravel y React Native | Tulio Contreras',
    summary:
      'Validación, operaciones simuladas e historial entre una API en Laravel y un cliente con React Native.',
    stack: ['Laravel', 'MySQL', 'React Native', 'Expo'],
    languages: ['PHP', 'JavaScript'],
    repository: 'https://github.com/Tulio-Contreras/Bank-app',
    context:
      'Una transferencia parece un botón. Detrás hay un destinatario, un importe, dos saldos y un historial que tienen que contar la misma historia. Bank App explora ese recorrido con una API en Laravel y una aplicación móvil en React Native.',
    contribution:
      'Desarrollé un proyecto educativo que conecta el backend con el cliente móvil: autenticación, consulta de cuentas y operaciones simuladas. El controlador de transferencias concentra las validaciones y los cambios de datos de la operación.',
    flow: [
      'Importe + destinatario',
      'Validación en Laravel',
      'Transacción en MySQL',
      'Respuesta al cliente',
    ],
    decisionTitle: 'Escribir los dos lados de la operación juntos.',
    decision:
      'El controlador abre una transacción de base de datos, descuenta al emisor, incrementa al destinatario y crea los registros de ingreso y egreso antes de confirmar. Si una escritura falla, ejecuta rollback. Así se evita confirmar solo una parte del recorrido cuando se produce una excepción.',
    failureTitle: 'La validación precede a la escritura.',
    failure:
      'El código comprueba que el destinatario exista, que el importe sea al menos 0,01 y que la descripción no supere 255 caracteres. Rechaza la transferencia a la misma cuenta y un importe superior al saldo. Estos errores devuelven una respuesta sin ejecutar el bloque de escritura.',
    tradeoff:
      'Una transacción no resuelve por sí sola todas las solicitudes simultáneas. Una siguiente versión necesita bloqueo de filas o actualizaciones condicionadas, idempotencia y pruebas de concurrencia. Este proyecto es una demostración educativa; no es un servicio financiero ni procesa dinero real.',
    demo: 'Prueba un importe válido, uno mayor que el saldo y uno con tres decimales. La demo usa centavos enteros, conserva el total entre las dos cuentas y evita modificar el estado si la operación es inválida. Es una implementación nueva en el navegador, no una conexión al backend original.',
    checks: [
      'Importe 75,00 → actualiza ambos saldos y añade una operación.',
      'Importe 2000 → saldo insuficiente; los datos permanecen iguales.',
      'Importe 1,005 → formato inválido; no se redondea silenciosamente.',
    ],
    sourcePath: 'bank-api/app/Http/Controllers/TransferController.php',
    sourceNote:
      'Validación, transacción, escritura del historial y rollback en el controlador original.',
    code: "DB::beginTransaction();\n$sender->balance -= $validated['amount'];\n$sender->save();\n$recipient->balance += $validated['amount'];\n$recipient->save();\n// Crear registros de egreso e ingreso.\nDB::commit();",
    codeNote:
      'Fragmento abreviado del flujo original; se omiten las escrituras del historial para facilitar la lectura.',
  },
  {
    slug: 'sembook',
    name: 'SemBook',
    theme: 'sage',
    type: 'Búsqueda + estado persistente',
    title: 'Buscar es el comienzo. Volver también cuenta.',
    seoTitle: 'SemBook: búsqueda de libros con Next.js y Zustand | Tulio Contreras',
    summary:
      'Un catálogo conectado a Open Library, con búsqueda, detalles y una selección de favoritos que permanece entre visitas.',
    stack: ['Next.js', 'TypeScript', 'Zustand', 'Open Library'],
    languages: ['TypeScript'],
    repository: 'https://github.com/Tulio-Contreras/prueba-tecnica-api-de-busqueda-de-libros',
    context:
      'La aplicación reúne la consulta de un catálogo público y la selección personal de libros. La búsqueda necesita una fuente externa; los favoritos necesitan recordar qué decidió guardar la persona. Son estados distintos y tienen recorridos distintos.',
    contribution:
      'Construí la integración con Open Library y la interfaz de búsqueda y detalle con Next.js y TypeScript. El estado compartido con Zustand organiza los resultados y favoritos, con persistencia selectiva para recuperar la biblioteca personal al volver.',
    flow: ['Título o autor', 'Open Library API', 'Resultados y detalle', 'Favoritos locales'],
    decisionTitle: 'Persistir la selección, no toda la búsqueda.',
    decision:
      'El store utiliza persist y partialize para guardar únicamente los favoritos. No conserva como datos permanentes la consulta, la carga o los errores de una visita. Además, comprueba que el libro no esté ya guardado antes de añadirlo.',
    failureTitle: 'Una API externa también puede no responder.',
    failure:
      'La capa de consulta distingue búsqueda, obra y autor, con periodos de revalidación diferentes. La interfaz tiene que contemplar una consulta sin resultados y un fallo de la fuente. Que los favoritos estén separados permite conservar esa selección aunque una consulta falle.',
    tradeoff:
      'Guardar en el navegador evita exigir una cuenta para una biblioteca pequeña. La selección queda ligada a ese dispositivo y puede perderse al borrar sus datos. Sin sincronización ni autenticación, no se debe presentar como una biblioteca disponible desde cualquier equipo.',
    demo: 'Busca un título o autor, guarda un libro y recarga la página. También puedes escribir una consulta sin coincidencias. Esta versión del portafolio usa cuatro libros de ejemplo para que la interacción se pueda probar sin depender de una API externa; no reproduce la aplicación completa.',
    checks: [
      'Busca “Mary” → aparece Frankenstein.',
      'Guarda un libro y recarga → el favorito permanece cuando el navegador permite almacenamiento.',
      'Busca “sin coincidencias” → se muestra una recuperación hacia el catálogo completo.',
    ],
    sourcePath: 'lib/store/useBookStore.ts',
    sourceNote: 'Persistencia selectiva y prevención de favoritos duplicados en el store original.',
    code: "persist(\n  (set, get) => ({ /* estado y acciones */ }),\n  {\n    name: 'book-store',\n    partialize: (state) => ({\n      favorites: state.favorites\n    })\n  }\n)",
    codeNote: 'Fragmento abreviado de la configuración de persistencia del proyecto.',
  },
  {
    slug: 'taskdev',
    name: 'TaskDev',
    theme: 'ochre',
    type: 'Equipos + revisión por roles',
    title: 'Terminar una tarea no es aprobarla.',
    seoTitle: 'TaskDev: tareas y aprobación por roles con Django | Tulio Contreras',
    summary:
      'Gestión de proyectos con Django: espacios de equipo, objetivos y revisión entre responsables y administradores.',
    stack: ['Python', 'Django', 'PostgreSQL'],
    languages: ['Python'],
    repository:
      'https://github.com/Tulio-Contreras/sistema-gestion-de-proyectos-de-equipo-desarrollo-',
    context:
      'En un equipo, una tarea puede estar hecha para quien la desarrolla y seguir pendiente para quien la revisa. TaskDev organiza salas, proyectos, tareas y objetivos, y mantiene separadas la revisión del responsable y la aprobación administrativa.',
    contribution:
      'Desarrollé una aplicación con Django para organizar el trabajo por equipos y representar las acciones de cada rol. El modelo guarda el estado de la tarea junto con las aprobaciones y las observaciones de revisión.',
    flow: [
      'Trabajo de desarrollo',
      'Revisión del responsable',
      'Aprobación administrativa',
      'Tarea completada',
    ],
    decisionTitle: 'Guardar el estado y quién puede cambiarlo.',
    decision:
      'En la vista de detalle, la revisión del responsable comprueba que la persona sea el manager del proyecto. Si aprueba, la tarea pasa a admin_approval. La rama administrativa comprueba is_staff y, al aprobar, cambia el estado a completed y registra la fecha de finalización.',
    failureTitle: 'Ocultar un botón no sustituye un permiso.',
    failure:
      'Las comprobaciones se ejecutan en el servidor, dentro del procesamiento de la acción. La demo permite intentar una transición con el rol equivocado: responde con un rechazo y conserva el tablero. Así se hace visible una regla que suele quedar escondida tras la interfaz.',
    tradeoff:
      'El flujo original está resuelto con ramas dentro de una vista. Si aumentan los roles y estados, conviene extraer las transiciones a una capa de dominio, verificar el estado previo y añadir pruebas de autorización. La demo local simplifica esa idea con un recorrido secuencial explícito.',
    demo: 'Intenta solicitar la aprobación de una tarea como Desarrollador: la acción se rechaza. Cambia a Responsable para avanzar la revisión y luego a Administrador para completar. El selector existe para explorar la regla en esta demo; en una aplicación real, el rol procede de la sesión autenticada.',
    checks: [
      'Desarrollador intenta aprobar una revisión → rechazo 403, sin cambios.',
      'Responsable solicita aprobación → la tarea avanza a Aprobación.',
      'Administrador completa una tarea en aprobación → aparece en Completado.',
    ],
    sourcePath: 'main/views.py',
    sourceNote:
      'Ramas manager_review y admin_approval en la vista task_detail del código original.',
    code: "if manager_approved:\n    task.status = 'admin_approval'\n\n# En la rama de aprobación administrativa:\nif admin_approved:\n    task.status = 'completed'\n    task.completed_at = timezone.now()",
    codeNote:
      'Fragmentos abreviados de dos ramas; las condiciones de autorización se explican arriba.',
  },
] as const;
