package com._BDS3A.PaginationAndSorting.Controller;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com._BDS3A.PaginationAndSorting.Model.Post;
import com._BDS3A.PaginationAndSorting.Service.PostService;
 
 
@RestController
@RequestMapping("/posts")
public class PostController {
 
    private final PostService postService;
 
    public PostController(PostService postService) {
        this.postService = postService;
    }
 
 
    // Pagination + Sorting
    @GetMapping
    public Page<Post> getPosts(
 
            @RequestParam(
                    defaultValue = "0"
            ) int page,
 
            @RequestParam(
                    defaultValue = "10"
            ) int size,
 
            @RequestParam(
                    defaultValue = "createdAt"
            ) String sortBy,
 
            @RequestParam(
                    defaultValue = "desc"
            ) String direction) {
 
        return postService.getPosts(
                page,
                size,
                sortBy,
                direction
        );
    }
 
 
    // Analytics
    @GetMapping("/analytics")
    public Object getAnalytics() {
 
        return postService.getAnalytics();
    }
 
 
    // Top Performing Posts
    @GetMapping("/top")
    public List<Post> getTopPosts(
 
            @RequestParam(
                    defaultValue = "5"
            ) int limit) {
 
        return postService.getTopPosts(limit);
    }
}