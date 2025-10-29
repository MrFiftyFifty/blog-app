<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Store a newly created comment for an article.
     */
    public function store(Request $request, string $articleId): JsonResponse
    {
        $article = Article::find($articleId);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $comment = Comment::create([
            'article_id' => $articleId,
            'author_name' => $request->author_name,
            'content' => $request->content,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Comment added successfully',
            'data' => $comment
        ], 201);
    }
}
