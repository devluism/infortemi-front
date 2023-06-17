<template>
  <div class="modal fade" tabindex="-1" id="terms-conditions-modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-between border-0">
          <span class="fs-4 fw-bold">Terms and Conditions</span>
          <div class="d-flex gap-2 flex-row align-items-center">
            <!-- <button @click="download" class="btn btn-sm btn-light-secondary"><i class="fa-solid fa-file-pdf me-2"></i>Download</button> -->
            <button class="btn btn-close" data-bs-dismiss="modal" id="close"></button>
          </div>
        </div>

        <!-- <div class="modal-body">
          <h4>Visión general</h4>

          <p>Este sitio web, Fund Your Trades, es propiedad y está operado por Fund Your Trades Global S.A.S (en adelante, la “Compañía”). La Compañía ofrece este sitio web, incluyendo toda la información, herramientas y servicio disponible en este sitio para usted, el usuario, condicionado a su aceptación de todos los términos, condiciones, políticas y avisos aquí establecidos.</p>

          <p>Al utilizar nuestro sitio y/o comprar algo de nosotros, usted se compromete con nuestro “Servicio” y acepta estar obligado por los siguientes términos y condiciones (“Términos de Servicio”, “Términos”), incluyendo aquellos términos y condiciones adicionales y políticas referenciadas aquí y/o disponibles por hipervínculo. Estas Condiciones de Servicio se aplican a todos los usuarios del sitio, incluyendo, sin limitación, a los usuarios que son navegantes, vendedores, clientes, comerciantes y/o contribuyentes de contenido.</p>

          <p>Le rogamos que lea atentamente estas Condiciones de Servicio antes de acceder o utilizar nuestro sitio web. Al acceder o utilizar cualquier parte del sitio, usted acepta quedar obligado por estas Condiciones de Servicio. Si no está de acuerdo con todos los términos y condiciones de este acuerdo, no podrá acceder al sitio web ni utilizar ningún servicio. Si estas condiciones de servicio se consideran una oferta, su aceptación está expresamente limitada a estas condiciones de servicio.</p>

          <p>Los Servicios están destinados únicamente a personas mayores de 18 años que residan en el país para el que están disponibles los Servicios. Al registrarse en el Sitio Web, usted confirma que es mayor de 18 años. Si es menor de 18 años, no podrá utilizar los Servicios. Usted se compromete a acceder a los Servicios únicamente desde uno de los países para los que los Servicios están disponibles. Usted reconoce que su acceso y uso de los Servicios puede estar restringido o prohibido por la ley en algunos países, y se compromete a acceder y utilizar los Servicios únicamente de acuerdo con la legislación aplicable.</p>

          <p>Cualquier nueva función o herramienta que se añada a la tienda actual (en la sección de cuentas proporcionadas) también estará sujeta a las Condiciones de Servicio. Puede consultar la versión más actualizada de las Condiciones de Servicio en cualquier momento en esta página. Nos reservamos el derecho de actualizar, cambiar o sustituir cualquier parte de estas Condiciones de Servicio publicando actualizaciones y/o cambios en nuestra página web. Es su responsabilidad revisar esta página periódicamente para ver si hay cambios. Su uso o acceso continuado a la página web tras la publicación de cualquier cambio constituye la aceptación de dichos cambios.</p>

          <p>NINGUNO DE LOS SERVICIOS QUE LE PROPORCIONA EL PROVEEDOR PUEDE CONSIDERARSE COMO SERVICIOS DE INVERSIÓN DE ACUERDO CON LA LEGISLACIÓN APLICABLE. El proveedor no le da ni le proporciona ninguna orientación, instrucción o información sobre cómo o de qué manera debe realizar las operaciones al utilizar los servicios o de otro modo, ni ninguna otra información similar sobre las herramientas de inversión negociadas, ni acepta ninguna orientación, instrucción o información de este tipo por su parte. NINGUNO DE LOS SERVICIOS CONSTITUYE ASESORAMIENTO O RECOMENDACIONES DE INVERSIÓN. NINGÚN EMPLEADO, PERSONAL O REPRESENTANTE DEL PROVEEDOR ESTÁ AUTORIZADO A PROPORCIONAR CONSEJOS O RECOMENDACIONES DE INVERSIÓN. EN CASO DE QUE CUALQUIER INFORMACIÓN O DECLARACIÓN DE CUALQUIER EMPLEADO, PERSONAL O REPRESENTANTE DEL PROVEEDOR SE INTERPRETE COMO ASESORAMIENTO O RECOMENDACIONES DE INVERSIÓN, EL PROVEEDOR RECHAZA EXPLÍCITAMENTE QUE LOS MISMOS CONSTITUYAN ASESORAMIENTO O RECOMENDACIONES DE INVERSIÓN Y NO SERÁ RESPONSABLE DE LOS MISMOS.</p>

          <p>Podemos conceder acceso a terceros a nuestro sitio web para solucionar y/o mantener problemas relacionados con el sitio web, la base de datos o la infraestructura. Estos accesos se supervisan y se eliminan una vez realizado el trabajo.</p>

          <p>TODOS LOS PAGOS SON DEFINITIVOS Y SÓLO PARA FINES DE EVALUACIÓN.</p>

          <p>Las tarifas de registro se pagan para permitir el acceso a la plataforma, los modelos y los servicios de Fund Your Trades. El cliente no tiene derecho a un reembolso de las comisiones de registro si el servicio se ha iniciado (es decir, comenzó a operar en nuestra plataforma) y / o el cliente no completó con éxito la Evaluación. Ningún reembolso se aplica a los tres modelos, Rápido, Evaluación y Acelerado que ofrece Fund Your Trades.</p>

          <h4>Sección 1 – Términos de registro en línea</h4>

          <p>Al aceptar estos Términos de Servicio, usted declara que es mayor de edad en su estado o provincia de residencia, o que es mayor de edad en su estado o provincia de residencia y nos ha dado su consentimiento para permitir que cualquiera de sus dependientes menores de edad utilice este sitio.</p>

          <p>Usted no puede utilizar nuestros servicios para ningún propósito ilegal o no autorizado ni puede, en el uso del Servicio, violar ninguna ley en su jurisdicción (incluyendo, pero no limitado a las leyes de derechos de autor).</p>

          <p>El incumplimiento o la violación de cualquiera de las Condiciones dará lugar a la terminación inmediata de sus Servicios.</p>

          <h4>Sección 2 – Condiciones generales</h4>

          <p>Nos reservamos el derecho de rechazar el servicio a cualquier persona por cualquier motivo y en cualquier momento. Usted entiende que su contenido (sin incluir la información de la tarjeta de crédito), puede ser transferido sin encriptar e implicar (a) transmisiones a través de varias redes; y (b) cambios para ajustarse y adaptarse a los requisitos técnicos de las redes o dispositivos de conexión. La información de las tarjetas de crédito siempre se encripta durante la transferencia a través de las redes.</p>

          <p>Usted se compromete a no reproducir, duplicar, copiar, vender, revender o explotar cualquier parte del Servicio, el uso del Servicio, o el acceso al Servicio o cualquier contacto en el sitio web a través del cual se proporciona el servicio, sin nuestro permiso expreso por escrito.</p>

          <p>Los títulos utilizados en este acuerdo se incluyen sólo por conveniencia y no limitarán o afectarán de otro modo a estos Términos.</p>

          <h4>Sección 3 – Exactitud, integridad y actualidad de la información</h4>

          <p>Hacemos todo lo posible para asegurar que la información que proporcionamos sea precisa, sin embargo, la información también es suministrada por terceros y no somos responsables si la información disponible en este sitio no es precisa, completa o actual. El material de este sitio se ofrece únicamente como información general y no debe utilizarse como única base para tomar decisiones sin consultar fuentes de información primarias, más precisas, más completas o más oportunas. Cualquier confianza en el material de este sitio es bajo su propio riesgo. Como opción para mitigar su riesgo, siempre puede enviar sus preguntas por correo electrónico a support@fundyourtrades.com</p>

          <p>Este sitio puede contener cierta información histórica. La información histórica, necesariamente, no es actual y se proporciona sólo para su referencia. Nos reservamos el derecho de modificar el contenido de este sitio en cualquier momento, pero no tenemos la obligación de actualizar ninguna información en nuestro sitio. Usted acepta que es su responsabilidad supervisar los cambios en nuestro sitio.</p>

          <h4>Sección 4 – Modificaciones del servicio y de los precios</h4>

          <p>Los precios de nuestros productos están sujetos a cambios sin previo aviso.</p>

          <p>Nos reservamos el derecho de modificar o interrumpir en cualquier momento el Servicio (cuentas proporcionadas) (o cualquier parte o contenido del mismo) sin previo aviso.</p>

          <p>No seremos responsables ante usted ni ante ningún tercero por cualquier modificación, cambio de precio, suspensión o interrupción del Servicio.</p>

          <h4>Sección 5 – Productos o servicios (si procede)</h4>

          <p>Nos reservamos el derecho, pero no estamos obligados, a limitar las ventas de nuestros productos o Servicios a cualquier persona, región geográfica o jurisdicción. Podemos ejercer este derecho caso por caso. Nos reservamos el derecho a limitar las cantidades de cualquier producto o servicio que ofrezcamos. Todas las descripciones de los productos o los precios de los mismos están sujetos a cambios en cualquier momento sin previo aviso, a nuestra entera discreción. Nos reservamos el derecho a suspender cualquier producto en cualquier momento. Toda oferta de cualquier producto o servicio realizada en este sitio es nula donde esté prohibida. No garantizamos que la calidad de cualquier producto, servicio, información u otro material comprado u obtenido por </p>
          
          <h4>Sección 6 – Exactitud de la información de facturación y de la cuenta</h4>

          <p>Nos reservamos el derecho a rechazar cualquier pedido que nos haga. Podemos, a nuestra entera discreción, limitar o cancelar las cantidades compradas por persona, por hogar o por pedido. Estas restricciones pueden incluir pedidos realizados por o bajo la misma cuenta de cliente, la misma tarjeta de crédito, y/o pedidos que utilicen la misma dirección de facturación y/o envío. En el caso de que hagamos un cambio o cancelemos un pedido, podemos intentar notificárselo poniéndonos en contacto con el correo electrónico y/o la dirección de facturación/el número de teléfono facilitados en el momento de realizar el pedido. Nos reservamos el derecho de limitar o prohibir los pedidos que, a nuestro juicio, parezcan realizados por comerciantes, revendedores o distribuidores no autorizados.</p>

          <p>Usted se compromete a proporcionar información de compra y de cuenta actual, completa y precisa para todas las compras realizadas en nuestra tienda. Usted se compromete a actualizar puntualmente su cuenta y otros datos, incluyendo su dirección de correo electrónico y los números y fechas de caducidad de las tarjetas de crédito, para que podamos completar sus transacciones y ponernos en contacto con usted cuando sea necesario.</p>

          <h4>Sección 7 – Herramientas opcionales</h4>

          <p>Es posible que le proporcionemos acceso a herramientas de terceros sobre las que no tenemos ningún control ni participación. Usted reconoce y acepta que le proporcionamos acceso a dichas herramientas “tal cual” y “según disponibilidad”, sin garantías, representaciones o condiciones de ningún tipo y sin ningún tipo de respaldo. No tendremos ninguna responsabilidad derivada o relacionada con su uso de las herramientas opcionales de terceros. Cualquier uso que usted haga de las herramientas opcionales que se ofrecen a través del sitio es totalmente a su propio riesgo y discreción y debe asegurarse de que está familiarizado y aprueba los términos en los que las herramientas son proporcionadas por el proveedor o proveedores de terceros pertinentes. También es posible que, en el futuro, ofrezcamos nuevos servicios y/o funciones a través del sitio web (incluido el lanzamiento de nuevas herramientas y recursos). Dichas nuevas funciones y/o servicios también estarán sujetos a estas Condiciones de servicio.</p>

          <h4>Sección 8 – Enlaces de terceros</h4>

          <p>Algunos contenidos, productos y servicios disponibles a través de nuestro Servicio pueden incluir materiales de terceros. Los enlaces de terceros en este sitio pueden dirigirles a sitios web de terceros que no están afiliados a nosotros. No somos responsables de examinar o evaluar el contenido o la exactitud y no garantizamos ni tendremos ninguna responsabilidad por los materiales o sitios web de terceros, o por cualquier otro material, producto o servicio de terceros. No somos responsables de ningún daño o perjuicio relacionado con la compra o el uso de bienes, servicios, recursos, contenidos o cualquier otra transacción realizada en relación con los sitios web de terceros. Por favor, revise cuidadosamente las políticas y prácticas de los terceros y asegúrese de entenderlas antes de realizar cualquier transacción. Las quejas, reclamaciones, inquietudes o preguntas relacionadas con los productos de terceros deben dirigirse a éstos.</p>

          <h4>Sección 9 – Comentarios de los usuarios, opiniones y otros envíos</h4>

          <p>Si, a petición nuestra, usted envía ciertos envíos específicos (por ejemplo, participaciones en concursos) o sin que nosotros se lo pidamos envía ideas creativas, sugerencias, propuestas, planes u otros materiales, ya sea en línea, por correo electrónico, por correo postal o de otra manera (colectivamente, “comentarios”), usted acepta que podamos, en cualquier momento, sin restricciones, editar, copiar, publicar, distribuir, traducir y utilizar de otra manera en cualquier medio cualquier comentario que nos envíe. No estamos ni estaremos obligados (1) a mantener la confidencialidad de ningún comentario; (2) a pagar una compensación por cualquier comentario; o (3) a responder a cualquier comentario.</p>

          <p>Podemos, pero no tenemos ninguna obligación, de controlar, editar o eliminar los contenidos que determinemos a nuestra entera discreción que son ilegales, ofensivos, amenazantes, calumniosos, difamatorios, pornográficos, obscenos o de cualquier otro modo objetables o que violen la propiedad intelectual de cualquier parte o estas Condiciones de Servicio.</p>

          <p>Usted acepta que sus comentarios no violarán ningún derecho de terceros, incluidos los derechos de autor, marca registrada, privacidad, personalidad u otro derecho personal o de propiedad. Asi mismo, acepta que sus comentarios no contendrán material difamatorio o ilegal, abusivo u obsceno, ni contendrán ningún virus informático u otro tipo de malware que pueda afectar de algún modo al funcionamiento del Servicio o de cualquier sitio web relacionado. No puede utilizar una dirección de correo electrónico falsa, ni hacerse pasar por otra persona que no sea usted, ni engañar de otro modo a nosotros o a terceros en cuanto al origen de los comentarios. Usted es el único responsable de los comentarios que haga y de su exactitud. No asumimos ninguna responsabilidad por los comentarios publicados por usted o por terceros.</p>

          <h4>Sección 10 – Información personal</h4>

          <p>El envío de información personal a través de la tienda se rige por nuestra Política de Privacidad.</p>

          <h4>Sección 11 – Errores, inexactitudes y omisiones</h4>

          <p>Ocasionalmente puede haber información en nuestro sitio o en el Servicio que contenga errores tipográficos, inexactitudes u omisiones que puedan estar relacionadas con las descripciones de los productos, los precios, las promociones, las ofertas, los gastos de envío de los productos, los tiempos de tránsito y la disponibilidad. Nos reservamos el derecho de corregir cualquier error, inexactitud u omisión, y de cambiar o actualizar la información o cancelar los pedidos si cualquier información en el Servicio o en cualquier sitio web relacionado es inexacta en cualquier momento y sin previo aviso (incluso después de que usted haya enviado su pedido).</p>

          <p>No asumimos ninguna obligación de actualizar, modificar o aclarar la información en el Servicio o en cualquier sitio web relacionado, incluyendo, sin limitación, la información sobre los precios, salvo que lo exija la ley. Ninguna fecha de actualización o de refresco aplicada en el Servicio o en cualquier sitio web relacionado, debe ser tomada como indicación de que toda la información en el Servicio o en cualquier sitio web relacionado ha sido modificada o actualizada.</p>

          <h4>Sección 12 – Usos prohibidos</h4>

          <p>Además de otras prohibiciones establecidas en las Condiciones de Servicio, está prohibido utilizar el sitio o su contenido (a) para cualquier propósito ilegal; (b) para solicitar a otros que realicen o participen en cualquier acto ilegal; (c) para violar cualquier regulación internacional, federal, provincial o estatal, normas, leyes u ordenanzas locales; (d) para infringir o violar nuestros derechos de propiedad intelectual o los derechos de propiedad intelectual de otros; (e) acosar, abusar, insultar, dañar, difamar, calumniar, menospreciar, intimidar o discriminar por motivos de género, orientación sexual, religión, etnia, raza, edad, origen nacional o discapacidad; (f) enviar información falsa o engañosa (g) cargar o transmitir virus o cualquier otro tipo de código malicioso que afecte o pueda afectar a la funcionalidad o al funcionamiento del Servicio o de cualquier sitio web relacionado, de otros sitios web o de Internet; (h) recoger o rastrear la información personal de otros (i) para hacer spam, phishing, pharm, pretexto, spider, crawl o scrape; (j) para cualquier propósito obsceno o inmoral; o (k) para interferir o eludir las características de seguridad del Servicio o de cualquier sitio web relacionado, otros sitios web o Internet. Nos reservamos el derecho de poner fin a su uso del Servicio o de cualquier sitio web relacionado por violar cualquiera de los usos prohibidos.</p>

          <h4>Sección 13 – Renuncia a las garantías; limitación de la responsabilidad</h4>

          <p>No garantizamos que el uso de nuestro servicio sea ininterrumpido, oportuno, seguro o libre de errores. No garantizamos que los resultados que puedan obtenerse del uso del servicio sean precisos o fiables. Usted acepta que, de vez en cuando, podemos retirar el servicio por periodos de tiempo indefinidos o cancelar el servicio en cualquier momento, sin previo aviso. Usted acepta expresamente que el uso que haga del servicio, o la imposibilidad de utilizarlo, será por su cuenta y riesgo. El servicio y todos los productos y servicios que se le entregan a través del servicio se proporcionan (salvo que nosotros lo indiquemos expresamente) “tal cual” y “según disponibilidad” para su uso, sin ninguna representación, garantía o condición de ningún tipo, ya sea expresa o implícita, incluidas todas las garantías o condiciones implícitas de comerciabilidad, calidad comercial, idoneidad para un fin determinado, durabilidad, titularidad y no infracción. En ningún caso Intellimeter, nuestros directores, funcionarios, empleados, afiliados, agentes, contratistas, pasantes, proveedores, prestadores de servicios o licenciantes serán responsables de cualquier lesión, pérdida, reclamación o cualquier daño directo, indirecto, incidental, punitivo, especial o consecuente de cualquier tipo, incluyendo, sin limitación, la pérdida de ganancias, ingresos, ahorros, pérdida de datos, costos de reemplazo o cualquier daño similar, ya sea basado en un contrato, agravio (incluyendo negligencia) responsabilidad estricta o de otro tipo, que surjan del uso que usted haga de cualquiera de los servicios o de cualquier producto obtenido mediante el servicio, o por cualquier otra reclamación relacionada de algún modo con el uso que usted haga del servicio o de cualquier producto, incluyendo, pero sin limitarse a, cualquier error u omisión en cualquier contenido, o cualquier pérdida o daño de cualquier tipo en el que se incurra como resultado del uso del servicio o de cualquier contenido (o producto) publicado, transmitido o puesto a disposición a través del servicio, incluso si se avisa de su posibilidad. Debido a que algunos estados o jurisdicciones no permiten la exclusión o la limitación de la responsabilidad por daños consecuentes o incidentales, en dichos estados o jurisdicciones, nuestra responsabilidad se limitará al máximo permitido por la ley.</p>

          <h4>Sección 14 – Indemnización</h4>

          <p>Usted se compromete a indemnizar, defender y eximir de responsabilidad a Intellimeter y a nuestras empresas matrices, subsidiarias, afiliadas, socios, funcionarios, directores, agentes, contratistas, licenciatarios, proveedores de servicios, subcontratistas, proveedores, pasantes y empleados, de cualquier reclamación o demanda, incluidos los honorarios razonables de los abogados, presentada por cualquier tercero debido a, o que surja de, su incumplimiento de estos Términos de Servicio o de los documentos que incorporan por referencia, o de su violación de cualquier ley o de los derechos de un tercero.</p>

          <h4>Sección 15 – Severidad</h4>

          <p>En el caso de que se determine que alguna disposición de estas Condiciones de Servicio es ilegal, nula o inaplicable, dicha disposición será, no obstante, aplicable en la medida en que lo permita la legislación aplicable, y la parte inaplicable se considerará separada de estas Condiciones de Servicio, sin que dicha determinación afecte a la validez y aplicabilidad de las demás disposiciones.</p>

          <h4>Sección 16 – Terminación</h4>

          <p>Las obligaciones y responsabilidades de las partes contraídas antes de la fecha de terminación sobrevivirán a la terminación de este acuerdo a todos los efectos. Estas Condiciones de Servicio son efectivas a menos y hasta que sean rescindidas por usted o por nosotros. Usted puede rescindir estas Condiciones de Servicio en cualquier momento notificándonos que ya no desea utilizar nuestros Servicios, o cuando deje de utilizar nuestro sitio.</p>

          <p>Si a nuestro juicio usted no cumple, o sospechamos que ha incumplido, cualquier término o disposición de estas Condiciones de Servicio, también podremos rescindir este acuerdo en cualquier momento sin previo aviso y usted seguirá siendo responsable de todos los importes adeudados hasta la fecha de rescisión inclusive; y/o en consecuencia podremos denegar el acceso a nuestros Servicios (o a cualquier parte de los mismos).</p>

          <h4>Sección 17 – Acuerdo completo</h4>

          <p>El hecho de que no ejerzamos o hagamos valer cualquier derecho o disposición de estas Condiciones de Servicio no constituirá una renuncia a dicho derecho o disposición. Estas Condiciones de Servicio y cualquier política o norma de funcionamiento publicada por nosotros en este sitio o con respecto al Servicio constituyen el acuerdo y entendimiento completo entre usted y nosotros y rigen su uso del Servicio, sustituyendo cualquier acuerdo, comunicación y propuesta anterior o contemporánea, ya sea oral o escrita, entre usted y nosotros (incluyendo, pero no limitado a, cualquier versión anterior de las Condiciones de Servicio). Cualquier ambigüedad en la interpretación de estas Condiciones de Servicio no se interpretará en contra de la parte que las redacte.</p>

          <h4>Sección 18 – Ley aplicable</h4>

          <p>Estas Condiciones del servicio y cualquier otro acuerdo por el que le proporcionamos servicios se regirán e interpretarán de acuerdo con la jurisdicción legal del usuario.</p>

          <h4>Sección 19 – Cambios en las condiciones de servicio</h4>

          <p>Puede consultar la versión más actualizada de las Condiciones de Servicio en cualquier momento en esta página.</p>

          <p>Nos reservamos el derecho, a nuestra entera discreción, de actualizar, cambiar o sustituir cualquier parte de estas Condiciones de Servicio mediante la publicación de actualizaciones y cambios en nuestro sitio web. Es su responsabilidad revisar nuestro sitio web periódicamente para ver si hay cambios. Su uso o acceso continuado a nuestro sitio web o al Servicio tras la publicación de cualquier cambio en estas Condiciones de Servicio constituye la aceptación de dichos cambios.</p>

          <h4>Sección 20 – Información de contacto</h4>

          <p>Las preguntas sobre las Condiciones de Servicio deben enviarse a support@fundyourtrades.com</p>
        </div> -->

        <div class="modal-body px-10">
          <el-tabs class="demo-tabs" :stretch="true">
            <el-tab-pane>
              <template #label>
                <span class="text-hover-secondary fw-bold">General</span>
              </template>
              <div style="height: 60vh; overflow-y: scroll;">
                <h4 class="mb-4">Overview</h4>

                <p style="text-align: justify;">This website, Fund Your Trades, is owned and operated by Fund Your Trades
                  Global S.A.S (the "Company"). The Company offers this website, including all information, tools and
                  services available from this site to you, the user, conditioned upon your acceptance of all terms,
                  conditions, policies and notices stated here.</p>

                <p style="text-align: justify;">By using our site and/or purchasing anything from us, you engage in our
                  "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"),
                  including those additional terms and conditions and policies referenced herein and/or available by
                  hyperlink. These Terms of Service apply to all users of the site, including, without limitation, users
                  who are browsers, vendors, customers, merchants and/or content contributors.</p>

                <p style="text-align: justify;">Please read these Terms of Service carefully before accessing or using our
                  website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If
                  you do not agree to all of the terms and conditions of this agreement, you may not access the site or
                  use any services. If these Terms of Service are considered an offer, your acceptance is expressly
                  limited to these Terms of Service.</p>

                <p style="text-align: justify;">The Services are intended only for persons over the age of 18 who reside
                  in the country for which the Services are available. By registering on the Website, you confirm that you
                  are 18 years of age or older. If you are under 18, you may not use the Services. You agree to access the
                  Services only from one of the countries for which the Services are available. You acknowledge that your
                  access to and use of the Services may be restricted or prohibited by law in some countries, and you
                  agree to access and use the Services only in accordance with applicable law.</p>

                <p style="text-align: justify;">Any new features or tools added to the current store (in the accounts
                  provided section) will also be subject to the Terms of Service. You can view the most current version of
                  the Terms of Service at any time on this page. We reserve the right to update, change or replace any
                  part of these Terms of Service by posting updates and/or changes on our website. It is your
                  responsibility to review this page periodically to check for changes. Your continued use of or access to
                  the site following the posting of any changes constitutes acceptance of those changes.</p>

                <p style="text-align: justify;">NONE OF THE SERVICES PROVIDED TO YOU BY THE PROVIDER CAN BE CONSIDERED AS
                  INVESTMENT SERVICES ACCORDING TO WITH APPLICABLE LAW. The provider does not give or provide you with any
                  guidance, instruction or information on how or in what manner you should perform transactions when using
                  the services or otherwise, or any other similar information about the traded investment tools, nor does
                  it accept any such guidance, instruction or information from you. NONE OF THE SERVICES CONSTITUTE
                  INVESTMENT ADVICE OR RECOMMENDATIONS. NO EMPLOYEE, STAFF OR REPRESENTATIVE OF THE PROVIDER IS AUTHORIZED
                  TO PROVIDE INVESTMENT ADVICE OR RECOMMENDATIONS. IN THE EVENT THAT ANY INFORMATION OR STATEMENTS BY ANY
                  EMPLOYEE, PERSONNEL OR REPRESENTATIVE OF THE PROVIDER ARE CONSTRUED AS INVESTMENT ADVICE OR
                  RECOMMENDATIONS, THE PROVIDER EXPRESSLY DISCLAIMS THAT THE SAME CONSTITUTE INVESTMENT ADVICE OR
                  RECOMMENDATIONS AND SHALL NOT BE LIABLE FOR THE SAME.,</p>

                <p style="text-align: justify;">We may grant third parties access to our website to troubleshoot and/or
                  maintain problems related to the website, database or infrastructure. These accesses are monitored and
                  removed once the work is done.</p>

                <p style="text-align: justify;">ALL PAYMENTS ARE FINAL AND FOR EVALUATION PURPOSES ONLY.</p>

                <p style="text-align: justify;">Registration fees are paid to allow access to the platform, models and
                  services of Fund Your Trades. The client is not entitled to a refund of the registration fees if the
                  service has been initiated (i.e. started trading on our platform) and/or the client did not successfully
                  complete the Evaluation. No refund applies to the three models, Fast, Evaluation and Accelerated offered
                  by Fund Your Trades.</p>

                <h4 class="mt-8 mb-4">Section 1 - Online Registration Terms</h4>

                <p style="text-align: justify;">By agreeing to these Terms of Service, you represent that you are of the
                  age of majority in your state or province of residence, or that you are of the age of majority in your
                  state or province of residence and have given us your consent to allow any of your minor dependents to
                  use this site.</p>

                <p style="text-align: justify;">You may not use our services for any illegal or unauthorized purpose nor
                  may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to
                  copyright laws).</p>

                <p style="text-align: justify;">Failure to comply with or breach of any of the Terms will result in
                  immediate termination of your Services.</p>

                <h4 class="mt-8 mb-4">Section 2 - General Conditions</h4>

                <p style="text-align: justify;">We reserve the right to refuse service to anyone for any reason at any
                  time. You understand that your content (not including credit card information), may be transferred
                  unencrypted and may involve (a) transmissions over various networks; and (b) changes to conform and
                  adapt to technical requirements of connecting networks or devices. Credit card information is always
                  encrypted during transfer across networks.</p>

                <p style="text-align: justify;">You agree not to reproduce, duplicate, copy, sell, resell or exploit any
                  portion of the Service, use of the Service, or access to the Service or any contact on the website
                  through which the Service is provided, without our express written permission.</p>

                <p style="text-align: justify;">The headings used in this agreement are for convenience only and shall not
                  limit or otherwise affect these Terms.</p>

                <h4 class="mt-8 mb-4">Section 3 - Accuracy, completeness and timeliness of information</h4>

                <p style="text-align: justify;">We make every effort to ensure that the information we provide is
                  accurate, however, the information is also provided by third parties and we are not responsible if the
                  information available on this site is not accurate, complete or current. The material on this site is
                  provided for general information only and should not be used as the sole basis for making decisions
                  without consulting primary, more accurate, more complete or more timely sources of information. Any
                  reliance on the material on this site is at your own risk. As an option to mitigate your risk, you can
                  always email your questions to support@fundyourtrades.com.</p>

                <p style="text-align: justify;">This site may contain certain historical information. Historical
                  information is not necessarily current and is provided for your reference only. We reserve the right to
                  modify the content of this site at any time, but we have no obligation to update any information on our
                  site. You agree that it is your responsibility to monitor changes to our site.</p>

                <h4 class="mt-8 mb-4">Section 4 - Changes in Service and Prices</h4>

                <p style="text-align: justify;">The prices of our products are subject to change without notice.</p>

                <p style="text-align: justify;">We reserve the right at any time to modify or discontinue the Service
                  (accounts provided) (or any part or content thereof) without notice.</p>

                <p style="text-align: justify;">We will not be liable to you or any third party for any modification,
                  price change, suspension or discontinuance of the Service.</p>

                <h4 class="mt-8 mb-4">Section 5 - Products or services (if applicable)</h4>

                <p style="text-align: justify;">We reserve the right, but are not obligated, to limit sales of our
                  products or Services to any person, geographic region or jurisdiction. We may exercise this right on a
                  case-by-case basis. We reserve the right to limit the quantities of any products or services we offer.
                  All product descriptions or product prices are subject to change at any time without notice, at our sole
                  discretion. We reserve the right to discontinue any product at any time. Any offer for any product or
                  service made on this site is void where prohibited. We make no warranty as to the quality of any
                  products, services, information or other material purchased or obtained by.</p>

                <h4 class="mt-8 mb-4">Section 6 - Accuracy of Billing and Account Information</h4>

                <p style="text-align: justify;">We reserve the right to refuse any order you place with us. We may, in our
                  sole discretion, limit or cancel quantities purchased per person, per household, or per order. These
                  restrictions may include orders placed by or under the same customer account, the same credit card,
                  and/or orders using the same credit card, the same billing and/or shipping address. In the event that we
                  make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or
                  billing address/phone number provided at the time the order was placed. We reserve the right to limit or
                  prohibit orders that, in our sole judgment, appear to be placed by unauthorized dealers, resellers or
                  distributors.</p>

                <p style="text-align: justify;">You agree to provide current, complete and accurate purchase and account
                  information for all purchases made at our store. You agree to promptly update your account and other
                  information, including your email address and credit card numbers and expiration dates, so that we can
                  complete your transactions and contact you when necessary.</p>

                <h4 class="mt-8 mb-4">Section 7 - Optional Tools</h4>

                <p style="text-align: justify;">We may provide you with access to third party tools over which we have no
                  control or involvement. You acknowledge and agree that we provide you access to such tools on an "as is"
                  and "as available" basis, without warranties, representations or conditions of any kind and without any
                  endorsement. We shall have no liability arising out of or relating to your use of the optional third
                  party tools. Any use by you of optional tools offered through the Site is entirely at your own risk and
                  discretion and you should ensure that you are familiar with and approve of the terms on which the tools
                  are provided by the relevant third party provider(s). We may also, in the future, offer new services
                  and/or features through the site (including, the release of new tools and resources). Such new features
                  and/or services will also be subject to these Terms of Service.</p>

                <h4 class="mt-8 mb-4">Section 8 - Third Party Links</h4>

                <p style="text-align: justify;">Some content, products and services available through our Service may
                  include materials from third parties. Third party links on this site may direct you to third party
                  websites that are not affiliated with us. We are not responsible for examining or evaluating the content
                  or accuracy and we do not warrant and will not have any liability or responsibility for any third-party
                  materials or websites, or for any other materials, products or services of third parties. We are not
                  responsible for any damages or injury related to the purchase or use of goods, services, resources,
                  content or any other transactions made in connection with third party websites. Please carefully review
                  the policies and practices of the third parties and make sure you understand them before entering into
                  any transaction. Complaints, claims, concerns or questions regarding third party products should be
                  directed to the third party.</p>

                <h4 class="mt-8 mb-4">Section 9 - User Comments, Feedback and Other Submissions</h4>

                <p style="text-align: justify;">If, at our request, you send certain specific submissions (e.g., contest
                  entries) or without our request you send creative ideas, suggestions, proposals, plans or other
                  materials, whether online, by e-mail, by postal mail or otherwise (collectively, "comments"), you agree
                  that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise
                  use in any medium any comments you send to us. We are not and will not be obligated (1) to maintain the
                  confidentiality of any Comments; (2) to pay compensation for any Comments; or (3) to respond to any
                  Comments.</p>

                <p style="text-align: justify;">We may, but have no obligation to, monitor, edit or remove content that we
                  determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory,
                  defamatory, pornographic, obscene or otherwise objectionable or in violation of any party's intellectual
                  property or these Terms of Service.</p>

                <p style="text-align: justify;">You agree that your comments will not violate any third party rights,
                  including copyright, trademark, privacy, personality or other personal or proprietary rights. You
                  further agree that your comments will not contain defamatory or otherwise unlawful, abusive or obscene
                  material, or contain any computer virus or other malware that may in any way affect the operation of the
                  Service or any related website. You may not use a false e-mail address, impersonate any person other
                  than yourself, or otherwise mislead us or any third party as to the origin of any comments. You are
                  solely responsible for the comments you make and their accuracy. We assume no responsibility for
                  comments posted by you or any third party.</p>

                <h4 class="mt-8 mb-4">Section 10 - Personal Information</h4>

                <p style="text-align: justify;">The submission of personal information through the store is governed by
                  our Privacy Policy.</p>

                <h4 class="mt-8 mb-4">Section 11 - Errors, inaccuracies and omissions</h4>

                <p style="text-align: justify;">From time to time there may be information on our site or in the Service
                  that contains typographical errors, inaccuracies or omissions that may relate to product descriptions,
                  pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the
                  right to correct any errors, inaccuracies or omissions, and to change or update information or cancel
                  orders if any information on the Service or any related website is inaccurate at any time without notice
                  (including after you have submitted your order).</p>

                <p style="text-align: justify;">We undertake no obligation to update, modify or clarify information on the
                  Service or any related website, including, without limitation, pricing information, except as required
                  by law. No update or refresh date applied to the Service or any related website should be taken as an
                  indication that all information on the Service or any related website has been modified or updated.</p>

                <h4 class="mt-8 mb-4">Section 12 - Prohibited Uses</h4>

                <p style="text-align: justify;">In addition to other prohibitions set forth in the Terms of Service, you
                  are prohibited from using the Site or its content (a) for any unlawful purpose; (b) to solicit others to
                  perform or participate in any unlawful act; (c) to violate any international, federal, provincial or
                  state regulations, rules, laws or local ordinances; (d) to infringe or violate our intellectual property
                  rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, libel,
                  slander, disparage, intimidate or discriminate on the basis of gender, sexual orientation, religion,
                  ethnicity, race, age, national origin or disability; (f) to post false or misleading information; (g) to
                  upload or transmit viruses or any other malicious code that affects or may affect the functionality or
                  operation of the Service or any related website, other web site or the Internet; (h) to collect or track
                  the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl or scrape; (j) for
                  any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the
                  Service or any related web site, other web sites or the Internet. We reserve the right to terminate your
                  use of the Service or any related website for violating any of the prohibited uses.</p>

                <h4 class="mt-8 mb-4">Section 13 - Disclaimer of Warranties; Limitation of Liability</h4>

                <p style="text-align: justify;">We do not warrant that use of our service will be uninterrupted, timely,
                  secure or error-free. We do not warrant that the results that may be obtained from the use of the
                  service will be accurate or reliable. You agree that, from time to time, we may withdraw the service for
                  indefinite periods of time or cancel the service at any time, without notice. You expressly agree that
                  your use of, or inability to use, the service is at your sole risk. The service and all products and
                  services delivered to you through the service are provided (unless expressly stated by us) "as is" and
                  "as available" for your use, without any representation, warranty or condition of any kind, either
                  express or implied, including all implied warranties or conditions of merchantability, merchantable
                  quality, fitness for a particular purpose, durability, title and non-infringement. In no event shall
                  Intellimeter, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers,
                  service providers or licensors be liable for any injury, loss, claim or any direct, indirect,
                  incidental, punitive, special or consequential damages of any kind, including, without limitation, loss
                  of profits, revenue, savings, loss of data, replacement costs or any similar damages, whether based on
                  contract, tort (including negligence) strict liability or otherwise, arising out of your use of any of
                  the service or any product obtained through the service, or for any other claim related in any way to
                  your use of the service or any product, including, but not limited to, any errors or omissions in any
                  content, or any loss or damage of any kind incurred as a result of your use of the service or any
                  content (or product) posted, transmitted or made available through the service, even if advised of their
                  possibility. Because some states or jurisdictions do not allow the exclusion or limitation of liability
                  for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited
                  to the maximum extent permitted by law.</p>

                <h4 class="mt-8 mb-4">Section 14 - Indemnification</h4>

                <p style="text-align: justify;">You agree to indemnify, defend and hold harmless Intellimeter and our
                  parents, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors,
                  service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand,
                  including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of
                  these Terms of Service or the documents they incorporate by reference, or your violation of any law or
                  the rights of a third-party.</p>

                <h4 class="mt-8 mb-4">Section 15 - Severity</h4>

                <p style="text-align: justify;">In the event that any provision of these Terms of Service is determined to
                  be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest
                  extent permitted by applicable law, and the unenforceable portion shall be deemed severed from these
                  Terms of Service, without such determination affecting the validity and enforceability of the remaining
                  provisions.</p>

                <h4 class="mt-8 mb-4">Section 16 - Termination</h4>

                <p style="text-align: justify;">The obligations and liabilities of the parties incurred prior to the
                  termination date shall survive the termination of this agreement for all purposes. These Terms of
                  Service are effective unless and until terminated by either you or us. You may terminate these Terms of
                  Service at any time by notifying us that you no longer wish to use our Services, or when you stop using
                  our site.</p>

                <p style="text-align: justify;">If in our judgment you fail to comply with, or we suspect that you have
                  failed to comply with, any term or provision of these Terms of Service, we may also terminate this
                  agreement at any time without notice and you will remain liable for all amounts due up to and including
                  the date of termination; and/or accordingly we may deny you access to our Services (or any part
                  thereof).</p>

                <h4 class="mt-8 mb-4">Section 17 - Entire Agreement</h4>

                <p style="text-align: justify;">Our failure to exercise or enforce any right or provision of these Terms
                  of Service shall not constitute a waiver of such right or provision. These Terms of Service and any
                  policies or operating rules posted by us on this site or with respect to the Service constitute the
                  entire agreement and understanding between you and us and govern your use of the Service, superseding
                  any prior or contemporaneous agreements, communications and proposals, whether oral or written, between
                  you and us (including, but not limited to, any prior versions of the Terms of Service). Any ambiguity in
                  the interpretation of these Terms of Service shall not be construed against the drafting party.</p>

                <h4 class="mt-8 mb-4">Section 18 - Applicable Law</h4>

                <p style="text-align: justify;">These Terms of Service and any other agreements whereby we provide
                  services to you shall be governed by and construed in accordance with the legal jurisdiction of the
                  user.</p>

                <h4 class="mt-8 mb-4">Section 19 - Changes in service conditions</h4>

                <p style="text-align: justify;">You can view the most current version of the Terms of Service at any time
                  on this page.</p>

                <p style="text-align: justify;">We reserve the right, at our sole discretion, to update, change or replace
                  any part of these Terms of Service by posting updates and changes on our website. It is your
                  responsibility to check our website periodically for changes. Your continued use of or access to our
                  website or the Service following the posting of any changes to these Terms of Service constitutes
                  acceptance of those changes.</p>

                <h4 class="mt-8 mb-4">Section 20 - Contact Information</h4>

                <p style="text-align: justify;">Questions about the Terms of Service should be sent to
                  support@fundyourtrades.com.</p>

              </div>
            </el-tab-pane>

            <el-tab-pane>
              <template #label>
                <span class="text-hover-secondary fw-bold">Affiliate</span>
              </template>
              <div style="height: 60vh; overflow-y: scroll;">
                <h4 class="mb-4">Introduction</h4>

                <p style="text-align: justify;">This agreement sets forth the terms and conditions governing your
                  participation in our FYT
                  Affiliate Program. By participating in our program, you agree to these terms and conditions.</p>

                <h4 class="mt-8 mb-4">Affiliate Relationship</h4>

                <p style="text-align: justify;">You are an independent contractor and not an employee, partner or joint
                  venture with us.
                  You will not be treated as an employee for any purposes, including for tax purposes.</p>

                <h4 class="mt-8 mb-4">Affiliate Link</h4>

                <p style="text-align: justify;">Once you are approved as an affiliate, you will receive a unique affiliate
                  link that will enable
                  us to track sales made through your link. You are responsible for promoting this link and</p>
                ensuring that it is used appropriately.

                <h4 class="mt-8 mb-4">Commission Structure</h4>

                <p style="text-align: justify;">You will earn a commission for each sale made through your affiliate link.
                  Super affiliates will
                  earn a commission of 20% per sale (terms and conditions apply), and all other affiliates will
                  earn a commission of 10% per sale.</p>

                <h4 class="mt-8 mb-4">Coupon Codes</h4>

                <p style="text-align: justify;">You will have the option to create unique coupon codes for your referrals.
                  These codes can
                  offer either a 5% or a 10% discount on the purchase of the product.</p>

                <h4 class="mt-8 mb-4">Refunds</h4>

                <p style="text-align: justify;">We offer complete refunds for evaluation account clients who have
                  successfully passed the
                  accounts without the use of EA (Expert Advisor) Systems. If a client applies for a refund, the
                  client will receive a deduction for the commision on that sale. Which means we will refund
                  the amount paid minus the commission paid to the affiliate.
                  Accelerated and Fast Programs are not refundable and you as an affiliate will get the full
                  commission as well.</p>

                <h4 class="mt-8 mb-4">Payment</h4>

                <p style="text-align: justify;">Affiliate commissions will be paid on a monthly basis, and will be
                  calculated based on the
                  number of sales made through the affiliate's unique link or coupon code.</p>

                <h4 class="mt-8 mb-4">Termination</h4>

                <p style="text-align: justify;">We reserve the right to terminate an affiliate's account if we determine
                  that the affiliate is
                  engaging in fraudulent or unethical behavior, or if they are not following the terms and
                  conditions of the program.</p>

                <h4 class="mt-8 mb-4">Marketing Materials</h4>

                <p style="text-align: justify;">We will provide affiliates with marketing materials, including banners and
                  other promotional
                  materials, to help them promote the product. You are responsible for using these materials
                  appropriately and in compliance with applicable laws and regulations.</p>

                <h4 class="mt-8 mb-4">Confidentiality</h4>

                <p style="text-align: justify;">As an affiliate, you may have access to confidential information about our
                  business. You
                  agree to keep this information confidential and not to disclose it to third parties.</p>

                <h4 class="mt-8 mb-4">Representations and Warranties</h4>

                <p style="text-align: justify;">You represent and warrant that you have the legal right to enter into this
                  agreement and that
                  you will comply with all applicable laws and regulations in promoting the product.</p>

                <h4 class="mt-8 mb-4">Limitation of Liability</h4>

                <p style="text-align: justify;">We will not be liable for any indirect, special, or consequential damages
                  arising from your
                  participation in the affiliate program.</p>

                <h4 class="mt-8 mb-4">Governing Law and Jurisdiction</h4>

                <p style="text-align: justify;">This agreement will be governed by and construed in accordance with the
                  laws of the
                  jurisdiction where we are based. Any disputes arising from this agreement will be resolved in
                  accordance with the laws of that jurisdiction.</p>

                <h4 class="mt-8 mb-4">Amendments</h4>

                <p style="text-align: justify;">We may amend this agreement at any time by posting a revised version on
                  our website.
                  Your continued participation in the affiliate program after any such amendment will constitute
                  your acceptance of the amended agreement.</p>

                <h4 class="mt-8 mb-4">Entire Agreement</h4>

                <p style="text-align: justify;">This agreement constitutes the entire agreement between you and us and
                  supersedes all
                  prior agreements and understandings, whether written or oral, relating to the subject matter
                  of this agreement.</p>

                <p style="text-align: justify;">If you have any questions or concerns, please don't hesitate to contact us
                </p>
              </div>
            </el-tab-pane>

            <el-tab-pane>
              <template #label>
                <span class="text-hover-secondary fw-bold">Super Affiliate</span>
              </template>
              <div style="height: 60vh; overflow-y: scroll;">
                <h1 class="h-100 w-100 d-flex justify-content-center align-items-center m-0 p-0">
                  Coming soon...
                </h1>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, defineEmits, ref } from "vue"
import axios from "axios"
import Swal from "sweetalert2"

export default defineComponent({
  name: "terms-conditions-modal",
  setup() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    })

    const download = async () => {
      axios({
        url: 'download-terms-conditions',
        method: 'POST',
        responseType: 'blob',
      }).then((response) => {
        const href = URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', 'terms_and_conditions_en');
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(href)
        Toast.fire({ icon: "success", title: "Download request processed", })
      })
    }

    return {
      download,
    }
  },
})
</script>
  