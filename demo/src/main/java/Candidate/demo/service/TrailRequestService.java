package Candidate.demo.service;
import Candidate.demo.entity.TrailRequest;
import Candidate.demo.repository.TrailRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TrailRequestService {

    @Autowired
    private TrailRequestRepository repository;

    public TrailRequest save(TrailRequest request) {
        return repository.save(request);
    }

    public List<TrailRequest> getAll() {
        return repository.findAll();
    }
}
