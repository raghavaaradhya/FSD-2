package com._BDS3A.PaginationAndSorting.Service;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com._BDS3A.PaginationAndSorting.Model.Post;
import com._BDS3A.PaginationAndSorting.Repository.PostRepository;

 

@Service

public class PostService {

 

    private final PostRepository postRepository;

 

    public PostService(PostRepository postRepository) {

        this.postRepository = postRepository;

    }

 

 

    // Pagination + Sorting

    public Page<Post> getPosts(

            int page,

            int size,

            String sortBy,

            String direction) {

 

        Sort sort;

 

        if (direction.equalsIgnoreCase("desc")) {

 

            sort = Sort.by(sortBy).descending();

 

        } else {

 

            sort = Sort.by(sortBy).ascending();

        }

 

        Pageable pageable =

                PageRequest.of(page, size, sort);

 

        return postRepository

                .findAllPostsWithAccount(pageable);

    }

 

 

    // Cached Analytics

    @Cacheable("analytics")

    public Object getAnalytics() {

 

        System.out.println(

                "Fetching analytics from DATABASE..."

        );

 

        return postRepository.getAnalytics();

    }

 

 

    // Cached Top Posts

    @Cacheable(

            value = "topPosts",

            key = "#limit"

    )

    public List<Post> getTopPosts(int limit) {

 

        System.out.println(

                "Fetching top posts from DATABASE..."

        );

 

        return postRepository

                .findTopPerformingPosts(limit);

    }

}


