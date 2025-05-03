"use client";

import { FileText } from "lucide-react";
import styles from "./utilityTab.module.scss";
import SeminarSummaryPopup from "./SeminarSummaryPopup";
import { useState } from "react";

export default function UtilityTab() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className={styles.iconButton}
        >
          <FileText />
        </button>
        <SeminarSummaryPopup
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          content="JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨. JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨. JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨. JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨. JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨. JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨. JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨."
        />
      </div>
    </div>
  );
}
