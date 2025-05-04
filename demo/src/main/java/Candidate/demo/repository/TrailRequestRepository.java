package Candidate.demo.repository;

import Candidate.demo.entity.TrailRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrailRequestRepository extends JpaRepository<TrailRequest, Long> {
}
